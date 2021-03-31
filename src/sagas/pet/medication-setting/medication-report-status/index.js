import { call, put, takeEvery } from 'redux-saga/effects'

import medicationReportStatusDuck from '@reducers/pet/medication-setting/medication-report-status'

const { types } = medicationReportStatusDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, name: 'Taken', charges: 'true' },
          { id: 1, name: 'Partially Taken', charges: 'false' },
          { id: 2, name: 'Refused', charges: 'true' }
        ]
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

