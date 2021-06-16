import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import trainingMethodDuck from '@reducers/training-method'

const { types } = trainingMethodDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const trainingMethods = yield call(Get, '/training-methods/')
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: trainingMethods
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
