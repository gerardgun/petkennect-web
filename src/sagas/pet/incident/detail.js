import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petIncidentDetailDuck from '@reducers/pet/incident/detail'
import petDetailDuck from '@reducers/pet/detail'

const { types } = petIncidentDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    const { item : { id:pet_id } = {} } = yield select(petDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pets/${pet_id}/incidents/${id}/`)

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
    const { item : { id:pet_id } = {} } = yield select(petDetailDuck.selectors.detail)

    yield put({ type: types.GET_PENDING })

    const petIncident = yield call(Get, `pets/${pet_id}/incidents/${id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: petIncident
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
    const { item : { id:pet_id } = {} } = yield select(petDetailDuck.selectors.detail)

    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `pets/${pet_id}/incidents/`, {
      ...payload,
      employee: 5 // delete
    })

    yield put({
      type   : types.POST_FULFILLED,
      payload: result
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
    const { item : { id:pet_id } = {} } = yield select(petDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    yield call(Patch,  `pets/${pet_id}/incidents/${payload.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* sendEmail({ payload }) {
  try {
    const { item : { id:pet_id } = {} } = yield select(petDetailDuck.selectors.detail)
    const { item : { id: pet_incident_id } = {} } = yield select(petIncidentDetailDuck.selectors.detail)

    yield put({ type: types.SEND_EMAIL_PENDING })
    const result = yield call(Post, `pets/${pet_id}/incidents/${pet_incident_id}/send-report/`, payload)

    yield put({
      type   : types.SEND_EMAIL_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.SEND_EMAIL_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.SEND_EMAIL, sendEmail)
]
