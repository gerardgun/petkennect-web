import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import medicationMeasurementDuck from '@reducers/pet/medication-setting/medication-measurement'

const { types } = medicationMeasurementDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const medications_measurement = yield call(Get, '/medication-measurements/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: medications_measurement
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

