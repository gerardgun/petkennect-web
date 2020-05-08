import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petDuck from '@reducers/pet'

const { types, selectors } = petDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)
    // yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    const { results, ...meta } = yield call(Get, '/pets/',filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items     : results,
        pagination: {
          ...list.pagination,
          meta
        }
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
