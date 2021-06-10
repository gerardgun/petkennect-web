import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import servicePackageDetailDuck from '@reducers/service/package/detail'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'
import _uniqBy from 'lodash/uniqBy'
import servicePackageDuck from '@reducers/service/package'

const { selectors, types } = servicePackageDetailDuck

function* create() {
  try {
    const detail = yield select(selectors.detail)
    let serviceOptions = []
    let locationOptions = []
    console.log(detail.item)
    if(detail.item.id) {
      // get services types of package
      const { results } = yield call(Get, 'services/', {
        ordering         : 'name',
        service_group__id: detail.item.service_group,
        page_size        : 100
      })

      serviceOptions = results.map(({ id, name }) => ({
        text : name,
        value: id
      }))
      // get locations of package
      const serviceSelected = results.find(
        ({ id }) => id === detail.item.applies_service_type.id
      )
      yield* locationSaga.get()
      const locationList = yield select(locationDuck.selectors.list)
      locationOptions = locationList.items
        .filter(({ id }) => serviceSelected.locations.includes(id))
        .map(({ id, name }) => ({
          text : name,
          value: id
        }))
    }
    yield put({ type: types.GET_PENDING })
    yield put({
      payload: {
        form: {
          service_type_options    : serviceOptions,
          location_options        : locationOptions,
          reservation_type_options: []
        }
      },
      type: types.GET_FULFILLED
    })
  } catch (e) {
    yield put({
      error: e,
      type : types.GET_FAILURE
    })
  }
}

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `services/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const service = yield call(Get, `services/${id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: service
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })
    /*
    const package = yield call(Post, 'packages/', payload)
    */

    /* codigo momentaneo hasta que se implemente los endpoints */
    const detail = yield select(selectors.detail)
    let packageList = yield select(servicePackageDuck.selectors.list)
    let locationList = []
    if(payload.applies_locations.length > 0)
      if(payload.applies_locations[0].id) { // copy case
        locationList = payload.applies_locations
      } else {
        // create case
        locationList = detail.form.location_options
          .map(({ value, text }) => {
            return { id: value, name: text }
          })
          .filter(({ id }) => payload.applies_locations.includes(id))
      }
    yield put({
      type   : servicePackageDuck.types.GET_FULFILLED,
      payload: {
        items: [
          ...packageList.items,
          {
            ...payload,
            id                  : Date.now(),
            is_active           : true,
            applies_service_type: payload.applies_service_type.id
              ? payload.applies_service_type
              : detail.form.service_type_options
                .map(({ value, text }) => {
                  return { id: value, name: text }
                })
                .find(({ id }) => id === payload.applies_service_type),
            applies_locations: locationList
          }
        ]
      }
    })

    yield put({
      type: types.POST_FULFILLED,
      payload
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload: { type, ...payload } }) {
  /* eslint no-unused-vars: 0 */ //

  try {
    yield put({ type: types.PUT_PENDING })
    /*
      yield call(Patch, `packages/${payload.id}/`, payload)
    */

    /* codigo momentaneo hasta que se implemente los endpoints */
    const detail = yield select(selectors.detail)
    let packageList = yield select(servicePackageDuck.selectors.list)
    yield put({
      type   : servicePackageDuck.types.GET_FULFILLED,
      payload: {
        items: packageList.items.map(item => {
          if(item.id === payload.id)
            return {
              ...payload,
              applies_service_type: detail.form.service_type_options
                .map(({ value, text }) => {
                  return { id: value, name: text }
                })
                .find(({ id }) => id === payload.applies_service_type),
              applies_locations: detail.form.location_options
                .map(({ value, text }) => {
                  return { id: value, name: text }
                })
                .filter(({ id }) => payload.applies_locations.includes(id))
            }

          return item
        })
      }
    })

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* createGetServiceTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const { results } = yield call(Get, 'services/', {
      ordering         : 'name',
      search           : payload.search,
      service_group__id: payload.service_group,
      page_size        : 10
    })
    let serviceOptions = results.map(({ id, name }) => ({
      text : name,
      value: id
    }))

    const detail = yield select(selectors.detail)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          service_type_options: _uniqBy(
            [ ...detail.form.service_type_options, ...serviceOptions ],
            'value'
          )
        }
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* createGetLocations({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const result = yield call(Get, `services/${payload.service_id}`)

    yield* locationSaga.get()

    const locationList = yield select(locationDuck.selectors.list)

    const detail = yield select(selectors.detail)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          location_options: locationList.items
            .filter(({ id }) => result.locations.includes(id))
            .map(({ id, name }) => ({
              text : name,
              value: id
            }))
        }
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.CREATE, create),
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.CREATE_GET_SERVICE_TYPES, createGetServiceTypes),
  takeEvery(types.CREATE_GET_LOCATIONS, createGetLocations)
]
