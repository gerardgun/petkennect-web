
import { call, put, takeEvery } from 'redux-saga/effects'

import foodTypeDuck from '@reducers/pet/feeding-setting/food-type'

const { types } = foodTypeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, name: 'House-Dry', charges: true, charge_type: 'No Charge',price: '2.00' },
          { id: 2, name: 'House-Wet', charges: false, charge_type: 'Per Meal',price: '0.00' },
          { id: 3, name: 'House-Grain Free', charges: true, charge_type: 'Per Day', price: '3.00' },
          { id: 4, name: 'Owner Supplied', charges: true, charge_type: 'No Charge',price: '2.50' }
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

