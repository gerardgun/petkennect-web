import { call, put, takeEvery } from 'redux-saga/effects'

import boardingReservationUsageDuck from '@reducers/pet/reservation/usage/boarding/reservation'

const {  types } = boardingReservationUsageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 1000)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1,past: '15', upcoming: '7', canceled: '0' }

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
