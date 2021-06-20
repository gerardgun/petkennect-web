import setupAddonServiceSettingDetailDuck from '@reducers/service/addon/general/add-on-service/detail'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'
import * as serviceGroupSaga from '@sagas/service/group'
import serviceGroupDuck from '@reducers/service/group'
import { Get, Post } from '@lib/utils/http-client'

const { types, selectors } = setupAddonServiceSettingDetailDuck

function* create() {
  try {
    const detail = yield select(selectors.detail)
    // locations
    yield* locationSaga.get()
    const locationList = yield select(locationDuck.selectors.list)
    let locationOptions = locationList.items.map(({ id, name }) => ({
      text : name,
      value: id
    }))
    // service groups
    yield* serviceGroupSaga.get()
    const serviceGroupList = yield select(serviceGroupDuck.selectors.list)
    // calendars
    const calendarOptions = yield call(Get, 'employees-schedules/')
    // if(detail.item.id) {}

    yield put({
      payload: {
        form: {
          ...detail.form,
          location_options      : locationOptions,
          location_total_options: locationOptions,
          service_group_options : serviceGroupList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          calendar_options: calendarOptions.map(({ id, name }) => ({
            text : name,
            value: id
          }))
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

function* post({ payload }) {
  try {
    console.log(payload)
    yield put({ type: types.POST_PENDING })

    const addon = yield call(Post, 'services/true-addons/', payload)

    // create price
    yield call(Post, `service-variations/${addon.id}/prices/`, payload.price)

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

function* getServiceTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const results = yield call(Get, 'services/', {
      ordering         : 'name',
      service_group__id: payload.service_group__id
    })

    const detail = yield select(selectors.detail)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          service_type_options: results.map(({ id, name }) => ({
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

function* getReservationTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    // get reservation types options
    const results = yield call(Get, 'services-variations/', {
      ordering: 'name',
      service : payload.service
    })

    const detail = yield select(selectors.detail)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          true_addons_options: results.map(({ id, name, locations }) => ({
            text : name,
            value: id,
            locations
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
  takeEvery(types.POST, post),
  takeEvery(types.GET_SERVICE_TYPES, getServiceTypes),
  takeEvery(types.GET_RESERVATION_TYPES, getReservationTypes)
]
