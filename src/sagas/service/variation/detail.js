import { call, put, select, takeEvery } from 'redux-saga/effects'

import { VariationTypeOptions } from '@lib/constants/service'
import { Delete, Get, Post, Patch } from '@lib/utils/http-client'
import * as employeeScheduleSaga from '@sagas/employee/schedule'
import * as locationSaga from '@sagas/location'
import * as serviceGroupSaga from '@sagas/service/group'

import employeeScheduleDuck from '@reducers/employee/schedule'
import locationDuck from '@reducers/location'
import serviceVariationDetailDuck from '@reducers/service/variation/detail'
import serviceGroupDuck from '@reducers/service/group'

const { selectors, types } = serviceVariationDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })

    let employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    let serviceGroupList = yield select(serviceGroupDuck.selectors.list)

    if(employeeScheduleList.items.length === 0) {
      yield* employeeScheduleSaga.get()

      employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    }

    if(serviceGroupList.items.length === 0) {
      yield* serviceGroupSaga.get()

      serviceGroupList = yield select(serviceGroupDuck.selectors.list)
    }

    yield put({
      payload: {
        form: {
          employee_schedule_options: employeeScheduleList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          service_group_options: serviceGroupList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          type_options: VariationTypeOptions
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

function* createGetLocations({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const detail = yield select(selectors.detail)
    let locationList = yield select(locationDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    const selectedService = detail.form.service_type_options
      .find(({ value }) => value === payload.service_id)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          location_options: locationList.items
            .filter(({ id }) => selectedService.location_ids.includes(id))
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

function* createGetServiceTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const { results } = yield call(Get, 'services/', {
      ordering         : 'name',
      search           : payload.search,
      service_group__id: payload.service_group__id,
      page_size        : 10
    })

    const detail = yield select(selectors.detail)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          service_type_options: results.map(({ id, name, locations }) => ({
            text        : name,
            value       : id,
            location_ids: locations
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

    const service = yield call(Post, 'services/', payload)

    yield put({
      type   : types.POST_FULFILLED,
      payload: service
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `services/${payload.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.CREATE, create),
  takeEvery(types.CREATE_GET_LOCATIONS, createGetLocations),
  takeEvery(types.CREATE_GET_SERVICE_TYPES, createGetServiceTypes),
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
