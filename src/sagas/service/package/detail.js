import moment from 'moment'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import servicePackageDetailDuck from '@reducers/service/package/detail'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'
import _uniqBy from 'lodash/uniqBy'
import servicePackageDuck from '@reducers/service/package'
import * as variationSaga from '@sagas/service/variation'
import variationDuck from '@reducers/service/variation'
import * as serviceSaga from '@sagas/service'
import serviceDuck from '@reducers/service'

const { selectors, types } = servicePackageDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })
    const detail = yield select(selectors.detail)
    let serviceOptions = []
    let locationOptions = []
    let reservationOptions = []

    // get services types of package
    const results = yield call(Get, 'services/', {
      ordering           : 'name',
      service_group__type: detail.item.service__group_type
    })

    serviceOptions = results.map(({ id, name }) => ({
      text : name,
      value: id
    }))

    if(detail.item.id) {
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
      // get reservation types options
      const variationList = yield call(Get, 'services-variations/', {
        service: detail.item.service,
        type   : 'A,R'
      })
      reservationOptions = variationList.map(({ id, name }) => ({
        text : name,
        value: id
      }))
    }
    yield put({
      payload: {
        form: {
          service_type_options: serviceOptions,
          location_options    : locationOptions,
          reservation_options : reservationOptions
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

/*
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
*/

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const package_item = yield call(
      Post,
      `services/${payload.service}/variations/`,
      {
        ...payload,
        type                  : 'P',
        duration_minutes      : 5,
        is_group_play_required: false,
        is_scheduled          : true
      }
    )
    // create price
    yield call(Post, `service-variations/${package_item.id}/prices/`, {
      price                      : payload.price,
      is_set_additional_pet_price: false,
      started_at                 : moment().format('YYYY-MM-DD[T]HH:mm:ss')
    })

    // create reservation types
    /*
    yield all(
      payload.applies_reservation_types.map((reservationTypeId) =>
        call(Post, `service-variations/${package_item.id}/addons/`, {
          addon_service_variation: reservationTypeId
        })
      )
    )
    */

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
  /* eslint no-unused-vars: 0 */
  try {
    const detail = yield select(selectors.detail)
    yield put({ type: types.PUT_PENDING })

    yield call(
      Patch,
      `services/${payload.service}/variations/${payload.id}`,
      payload
    )

    // create price
    yield call(Post, `service-variations/${payload.id}/prices/`, {
      price                      : payload.price,
      is_set_additional_pet_price: false,
      started_at                 : moment().format('YYYY-MM-DD[T]HH:mm:ss')
    })

    // prices deleted
    yield call(
      Delete,
      `service-variations/${payload.id}/prices/${detail.item.price_id}`
    )

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

/*
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
*/

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

function* createGetReservations({ payload }) {
  try {
    const detail = yield select(selectors.detail)
    yield put({ type: types.GET_PENDING })

    const variationList = yield call(Get, 'services-variations/', payload)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          reservation_options: variationList.map(({ id, name }) => ({
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

function* copy({ payload }) {
  /*
  const reservations = yield call(
    Get,
    `service-variations/${payload.id}/addons`,
    { page_size: 100 }
  )*/

  yield put({
    type   : types.POST,
    payload: {
      ...payload,
      name  : `${payload.name} (copy)`,
      sku_id: `${payload.sku_id} (copy)`
      // applies_reservation_types: reservations.results.map(({ id }) => id)
    }
  })
}

export default [
  takeEvery(types.CREATE, create),
  // takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.CREATE_GET_LOCATIONS, createGetLocations),
  takeEvery(types.CREATE_GET_RESERVATIONS, createGetReservations),
  takeEvery(types.COPY, copy)
]
