
import { call, put, takeEvery } from 'redux-saga/effects'

import medicationTypeDuck from '@reducers/pet/medication-setting/medication-type'

const { types } = medicationTypeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, name: 'Cream', charges: 'true', price: '$2.00' },
          { id: 1, name: 'Pill', charges: 'false', price: '$0.00' },
          { id: 2, name: 'Liquid', charges: 'true',  price: '$3.00' },
          { id: 3, name: 'Injectable', charges: 'true', price: '$2.50' }
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

