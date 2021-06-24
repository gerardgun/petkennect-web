import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import medicationTimeDuck from '@reducers/pet/medication-setting/medication-time'

const { types } = medicationTimeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const medications_times = yield call(Get, '/medication-times/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: medications_times
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

