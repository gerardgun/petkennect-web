import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import customizedFieldDuck from '@reducers/customized-field'

const { types } = customizedFieldDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const locations = yield call(Get, '/customized-field/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: locations
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
