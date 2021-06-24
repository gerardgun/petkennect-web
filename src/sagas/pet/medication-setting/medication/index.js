import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import medicationDuck from '@reducers/pet/medication-setting/medication'

const { types } = medicationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const medications = yield call(Get, '/medications/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: medications
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
