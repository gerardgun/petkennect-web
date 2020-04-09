import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import organizationDuck from '@reducers/organization'

const { types, selectors } = organizationDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const organizations = yield call(Get, '/organizations')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: organizations
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
