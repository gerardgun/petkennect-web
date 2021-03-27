import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import productFamilyDuck from '@reducers/product/family'

const { types } = productFamilyDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const items = yield call(Get, '/product-families/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items
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
