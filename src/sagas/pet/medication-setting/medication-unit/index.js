import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import medicationUnitDuck from '@reducers/pet/medication-setting/medication-unit'

const { types } = medicationUnitDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const medications_unit = yield call(Get, '/medication-units/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: medications_unit
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
