import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import categoryDuck from '@reducers/category'

const { selectors, types } = categoryDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const  results = yield call(Get, 'categories/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map((item,index) => ({ index: index,...item }))
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
