import { call, put, takeEvery , select } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import clientDocumentTypeDuck from '@reducers/client/document/type'

const { types, selectors } = clientDocumentTypeDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const items = yield call(Get, 'client-document-types/' , filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items
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
