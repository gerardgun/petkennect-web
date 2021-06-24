import { call, put, takeEvery } from 'redux-saga/effects'

import { Post } from '@lib/utils/http-client'

import userFilesDetailDuck from '@reducers/user_files/detail'

const { types } = userFilesDetailDuck

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    yield call(Post, '/common/user-files/', payload)

    yield put({ type: types.POST_FULFILLED })
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
