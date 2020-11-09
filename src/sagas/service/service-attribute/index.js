import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import serviceAttributeDuck from '@reducers/service/service-attribute'

const { types } = serviceAttributeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const serviceAttributes = yield call(Get, '/service-attributes/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: serviceAttributes
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
