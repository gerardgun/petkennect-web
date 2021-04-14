import { call, put, takeEvery } from 'redux-saga/effects'
// import _times from 'lodash/times'
// import faker from 'faker'

import groomingPrepaidUsageDuck from '@reducers/pet/reservation/usage/grooming/prepaid'

const { types } = groomingPrepaidUsageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 1000)))
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1 ,prepaid: '25', remaining: '10', remaining_price: '$10.00' }

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
