import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import medicationTypeDuck from '@reducers/pet/medication-setting/medication-type'

const { types } = medicationTypeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const medications_types = yield call(Get, '/medication-types/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: medications_types
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
