import { call, put, takeEvery } from 'redux-saga/effects'

import { Post } from '@lib/utils/http-client'

import companyProfileContactBillingDetailDuck from '@reducers/company-profile/contact-billing/detail'

const { types } = companyProfileContactBillingDetailDuck

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })
    const result = yield call(Post, '/payments/', payload)

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
