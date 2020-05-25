import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import productPackageDuck from '@reducers/product/package'

const { selectors, types } = productPackageDuck

function* get({ payload : id }) {
  try {
    yield put({ type: types.GET_PENDING })
    const filters = yield select(selectors.filters)

    const  results = yield call(Get, `packages/${id}/products/`, filters)

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
