
import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import reservationDetailDuck from '@reducers/reservation/detail'

const { types } = reservationDetailDuck

function* deleteItem(/* { ids } */) {
  try {
    const reservationDetail = yield select(reservationDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `reservations/${reservationDetail.item.id}/`)

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

    const item = yield call(Get, `reservations/${id}/`)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload: { ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    yield call(Post, 'reservations/', {
      ...payload
    })

    yield put({ type: types.POST_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { ...payload } }) {
  try {
    const reservationDetail = yield select(reservationDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `reservations/${reservationDetail.item.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
