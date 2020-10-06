import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import customizedDuck from '@reducers/customized-field'

const { types } = customizedDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const entitiesAttributes = yield call(Get, 'eav-entities/')
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: entitiesAttributes
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
