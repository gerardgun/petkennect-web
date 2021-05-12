import { call, put, takeEvery } from 'redux-saga/effects'

import { Get, Patch } from '@lib/utils/http-client'

import tenantDetailDuck from '@reducers/tenant/detail'

const { types } = tenantDetailDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const tenant = yield call(Get, '/tenants/current/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: tenant
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* _put({ payload }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, '/tenants/current/0/', payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.GET, get),
  takeEvery(types.PUT, _put)
]
