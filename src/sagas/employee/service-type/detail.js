import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import employeeServiceTypeDetailDuck from '@reducers/employee/service-type/detail'

const { selectors, types } = employeeServiceTypeDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })

    const employees = yield call(Get, 'employees/', {
      ordering: 'user__first_name'
    })
    const service_types = yield call(Get, 'services/', {
      type: 'B,C' // Boarding Activities and Custom Service Types
    })

    const detail = yield select(selectors.detail)

    yield put({
      payload: {
        form: {
          ...detail.form,
          employee_options: employees.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          service_type_options: service_types.map(({ id, first_name, last_name }) => ({
            text : `${first_name} ${last_name}`,
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

function* createGetReservationTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const detail = yield select(selectors.detail)

    const reservation_types = yield call(Get, 'services-variations/', {
      service: payload.service_type_id
    })

    yield put({
      payload: {
        form: {
          ...detail.form,
          reservation_type_options: reservation_types.map(({ id, name }) => ({
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

function* deleteItem({ id, employee_id }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `employees/${employee_id}/service-types/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* edit() {
  yield* create()

  const detail = yield select(selectors.detail)

  yield* createGetReservationTypes({
    payload: { service_type_id: detail.item.service }
  })
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `employees/${payload.employee_id}/service-types/`, {
      max_reservations_per_day: payload.max_reservations_per_day,
      service                 : payload.service_type_id,
      service_variations      : payload.reservation_type_ids
    })

    yield put({
      type   : types.POST_FULFILLED,
      payload: {
        item: result
      }
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

    const result = yield call(Patch, `employees/${payload.employee_id}/service-types/${payload.id}/`, {
      max_reservations_per_day: payload.max_reservations_per_day,
      service_variations      : payload.reservation_type_ids
    })

    yield put({
      type   : types.PUT_FULFILLED,
      payload: {
        item: result
      }
    })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.CREATE, create),
  takeEvery(types.CREATE_GET_RESERVATION_TYPES, createGetReservationTypes),
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.EDIT, edit),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
