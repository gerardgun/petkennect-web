import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import companyDuck from '@reducers/company'

const { types, selectors } = companyDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const companies = yield call(Get, '/companies')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: companies
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
