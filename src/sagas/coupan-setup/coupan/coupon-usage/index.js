import { call, put, takeEvery } from 'redux-saga/effects'

import coupanUsageDuck from '@reducers/coupan-setup/coupan/coupon-usage'

const { types } = coupanUsageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, total_times_uses: '150', total_discount: '1000.00', client_usage_list: '' }

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
