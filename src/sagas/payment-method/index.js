
import { call, put, takeEvery } from 'redux-saga/effects'

import paymentMethodDuck from '@reducers/payment-method'

const { types } = paymentMethodDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, name: 'Cash', status: 'Active' },
          { id: 1, name: 'Cheque or Money orders', status: 'Active' },
          { id: 2, name: 'E-transfer', status: 'Inactive' },
          { id: 3, name: 'Paypal', status: 'Active' },
          { id: 4, name: 'External credit card payment with your own POS terminal', status: 'Inactive' },
          { id: 5, name: 'External debit card payment with your own POS terminal', status: 'Inactive' },
          { id: 6, name: 'Online credit card payment', status: 'Active' }
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
