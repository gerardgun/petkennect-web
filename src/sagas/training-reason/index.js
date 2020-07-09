import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import trainingReasonsDuck from '@reducers/training-reason'

const { types } = trainingReasonsDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const trainingReasons = yield call(Get, '/training-reasons/')
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: trainingReasons
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
  takeEvery(types.GET, get)
]
