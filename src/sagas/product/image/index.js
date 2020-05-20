import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import productImageDuck from '@reducers/product/image'
import productDetailDuck from '@reducers/product/detail'

const { selectors, types } = productImageDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const { item : { id } = {} } = yield select(productDetailDuck.selectors.detail)

    const  results = yield call(Get, `products/${id}/images/`, filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results
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
