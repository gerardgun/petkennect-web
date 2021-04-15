
import { call, put, takeEvery } from 'redux-saga/effects'

import feedingTimeDuck from '@reducers/pet/feeding-setting/feeding-time'

const { types } = feedingTimeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, name: 'AM', charges: true, price: '2.00' },
          { id: 2, name: 'PM', charges: true, price: '2.50' },
          { id: 3, name: 'Lunch', charges: true, price: '2.00' },
          { id: 4, name: 'Daycare Dinner', charges: true, price: '3.00' },
          { id: 5, name: 'Additional Feeding', charges: false, price: '0.00' }
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

