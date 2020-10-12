import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import productAttributeDuck from '@reducers/product/product-attribute'

const { types } = productAttributeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const productAttributes = yield call(Get, '/product-attributes/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: productAttributes
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
