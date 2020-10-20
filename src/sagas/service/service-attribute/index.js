import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import serviceAttributeDuck from '@reducers/service/service-attribute'

const { types, selectors } = serviceAttributeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const { ...filters } = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, '/service-attributes/', filters)

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
