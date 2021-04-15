
import { call, put, takeEvery } from 'redux-saga/effects'

import medicationTimeDuck from '@reducers/pet/medication-setting/medication-time'

const { types } = medicationTimeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, name: 'AM', charges: true, price: '1.00' },
          { id: 2, name: 'PM', charges: false, price: '0.00' },
          { id: 3, name: 'As Needed', charges: true, price: '2.00' },
          { id: 4, name: 'Custom Time', charges: true, price: '2.00' }
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

