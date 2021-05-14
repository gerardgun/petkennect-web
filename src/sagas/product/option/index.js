import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import productOptionDuck from '@reducers/product/option'

const { selectors, types } = productOptionDuck

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const options = yield call(Get, `/products/${filters.product_id}/options/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: options
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
