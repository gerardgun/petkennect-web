import { call, put, takeEvery } from 'redux-saga/effects'

import { Post } from '@lib/utils/http-client/common'

import fileDetailDuck from '@reducers/file/detail'

const { types } = fileDetailDuck

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, '/common/user-files/', payload)

    yield put({
      type   : types.POST_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.POST, post)
]
