import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import medicationReportStatusDuck from '@reducers/pet/medication-setting/medication-report-status'

const { types } = medicationReportStatusDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const medications_report = yield call(Get, '/medication-report-statuses/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: medications_report
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

