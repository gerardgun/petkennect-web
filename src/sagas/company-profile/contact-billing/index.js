import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import companyProfileContactBillingDuck from '@reducers/company-profile/contact-billing'

const { types } = companyProfileContactBillingDuck

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const payments = yield call(Get, '/payments/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: payments
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
