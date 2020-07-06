import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import trainingCommandDuck from '@reducers/training-command'

const { types } = trainingCommandDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const trainingCommand = yield call(Get, '/training-commands/')
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: trainingCommand
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
