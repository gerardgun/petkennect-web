import { call, put, takeEvery } from 'redux-saga/effects'

import { Get, Post } from '@lib/utils/http-client'

import medicationTypeDetailDuck from '@reducers/pet/medication-setting/medication-type/detail'

const { types } = medicationTypeDetailDuck

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })
    
    const result = yield call(Post, '/medication-types/', payload)

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
  takeEvery(types.POST, post),
]
