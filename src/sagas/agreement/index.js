import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import agreementDuck from '@reducers/agreement'

const { types } = agreementDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const agreements = yield call(Get, '/agreements/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: agreements
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
