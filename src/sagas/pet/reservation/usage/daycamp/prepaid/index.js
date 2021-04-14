import { call, put, takeEvery } from 'redux-saga/effects'
// import _times from 'lodash/times'
// import faker from 'faker'

import dayCampPrepaidUsageDuck from '@reducers/pet/reservation/usage/daycamp/prepaid'

const { types } = dayCampPrepaidUsageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 1000)))
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1 , service_name: 'DayCamp',prepaid: '100', remaining: '4', remaining_price: '$50.00' },
          { id: 2 , service_name: 'Fitness',prepaid: '90', remaining: '5', remaining_price: '$50.00' },
          { id: 3 , service_name: 'Dog Walk',prepaid: '80', remaining: '3', remaining_price: '$40.00' }

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
