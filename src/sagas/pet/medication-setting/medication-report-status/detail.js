import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Patch, Post } from '@lib/utils/http-client'

import medicationReportStatusDetailDuck from '@reducers/pet/medication-setting/medication-report-status/detail'

const { types } = medicationReportStatusDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `/medication-report-statuses/${id}/`)

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

    const result = yield call(Post, '/medication-report-statuses/', payload)

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
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `/medication-report-statuses/${payload.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
