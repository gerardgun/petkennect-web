import moment from 'moment'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import { VariationReleaseCommissionUnitOptions } from '@lib/constants/service'
import { Delete, Get, Post, Patch } from '@lib/utils/http-client'
import * as employeeScheduleSaga from '@sagas/employee/schedule'
import * as locationSaga from '@sagas/location'

import employeeScheduleDuck from '@reducers/employee/schedule'
import locationDuck from '@reducers/location'
import serviceVariationReleaseDetailDuck from '@reducers/service/variation/release/detail'

const { selectors, types } = serviceVariationReleaseDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })

    const { results: employees } = yield call(Get, 'employees/', {
      page_size: 100,
      ordering : 'user__first_name'
    })

    // BEGIN get group class service
    const { results: services } = yield call(Get, 'services/', {
      service_group__type: 'T'
    })

    const groupClassService = services.find(({ type }) => type === 'G')
    // END get group class service

    const { results: serviceVariations } = yield call(Get, 'services-variations/', {
      page_size    : 100,
      ordering     : 'name',
      service__type: 'G'
    })

    yield put({
      payload: {
        form: {
          employee_trainer_options: employees.map(({ id, first_name, last_name }) => ({
            text : `${first_name} ${last_name}`,
            value: id
          })),
          commission_unit_options  : VariationReleaseCommissionUnitOptions,
          service_group_name       : groupClassService.group.name,
          service_name             : groupClassService.name,
          service_variation_options: serviceVariations
            .map(({ id, name, locations }) => ({
              text        : name,
              value       : id,
              location_ids: locations
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

function* createGetLocations({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const detail = yield select(selectors.detail)
    let locationList = yield select(locationDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    const selectedServiceVariation = detail.form.service_variation_options
      .find(({ value }) => value === payload.service_variation_id)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          location_options: locationList.items
            .filter(({ id }) => selectedServiceVariation.location_ids.includes(id))
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

function* deleteItem({ id, service_id }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `services/${service_id}/variations/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* edit() {
  try {
    yield put({ type: types.GET_PENDING })

    const detail = yield select(selectors.detail)

    const service = yield call(Get, `services/${detail.item.service.id}/`)

    let employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    let locationList = yield select(locationDuck.selectors.list)

    if(employeeScheduleList.items.length === 0) {
      yield* employeeScheduleSaga.get()

      employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    }

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          employee_schedule_options: employeeScheduleList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          location_options: locationList.items
            .filter(({ id }) => service.locations.includes(id))
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

function* post({ payload: { service_variation_id, frequencies, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `service-variations/${service_variation_id}/releases/`, payload)

    yield all(frequencies.map(item =>
      call(Post, `service-variation-releases/${result.id}/frequencies/`, item)
    ))

    yield put({
      type: types.POST_FULFILLED
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload: { id, service_id, price, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `services/${service_id}/variations/${id}/`, payload)

    if(price.id)
      yield call(Patch, `service-variations/${id}/prices/${price.id}/`, {
        ...price,
        started_at: moment(price.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
        ended_at  : moment(price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
      })
    else
      yield call(Post, `service-variations/${id}/prices/`, {
        ...price,
        started_at: moment(price.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
        ended_at  : moment(price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
      })

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
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.EDIT, edit),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
