import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import foodTimeDuck from '@reducers/service/food/time'

const { selectors, types } = foodTimeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const results = yield call(Get, '/food-times/', filters)

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

