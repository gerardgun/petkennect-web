import { call, put, takeEvery } from 'redux-saga/effects'

import coupanDuck from '@reducers/coupan-setup/coupan'

const { types } = coupanDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, coupon_name: 'New Client Promo',coupon_code: 'NEWCLIENT', expiration_date: '12/21/2021',status: true,discount_type: 'Percent' , value: '10%', reusable: false },
          { id: 2, coupon_name: '2021Promo',coupon_code: 'BYECOVID', expiration_date: '02/15/2021',status: false,discount_type: 'Dollar' , value: '$25.00', reusable: true }

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
