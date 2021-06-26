import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import fileDuck from '@reducers/file'

const { types } = fileDuck

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const files = yield call(Get, '/common/user-files/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: files
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
