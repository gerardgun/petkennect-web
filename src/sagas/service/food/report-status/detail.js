import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Post, Patch } from '@lib/utils/http-client'

import foodReportStatusDetailDuck from '@reducers/service/food/report-status/detail'

const { types } = foodReportStatusDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `food-report-statuses/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, 'food-report-statuses/', {
      name: payload.name
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

    const result = yield call(Patch, `food-report-statuses/${payload.id}/`, {
      name: payload.name
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
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
