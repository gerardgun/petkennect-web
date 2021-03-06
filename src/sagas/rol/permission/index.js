import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import rolPermissionDuck from '@reducers/rol/permission'

const { types } = rolPermissionDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const roles = yield call(Get, '/permissions/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: roles
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
