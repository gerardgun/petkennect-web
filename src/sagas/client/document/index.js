import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import clientDocumentDuck from '@reducers/client/document'

const { types, selectors } = clientDocumentDuck

function* get(/* { payload }*/) {
  try {
    yield put({ type: types.GET_PENDING })

    const { client_id, ...filters } = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, `clients/${client_id}/documents/`, filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items     : results,
        pagination: {
          ...list.pagination,
          meta
        }
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
