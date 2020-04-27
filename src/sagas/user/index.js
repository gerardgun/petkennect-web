import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import userDuck from '@reducers/user'

const { types } = userDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const users = yield call(Get, '/user')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: users
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
