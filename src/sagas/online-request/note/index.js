import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Get } from '@lib/utils/http-client'

import onlineRequestNoteDuck from '@reducers/online-request/note'

const { types, selectors } = onlineRequestNoteDuck

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const { request_id, filters } = yield select(selectors.filters)

    const results = yield call(Get, `/requests/${request_id}/notes/`, {
      ...filters
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results
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
