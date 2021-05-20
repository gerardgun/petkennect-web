import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import serviceGroupDuck from '@reducers/service/group'

const { types } = serviceGroupDuck

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const groups = yield call(Get, 'service-groups/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: groups
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
