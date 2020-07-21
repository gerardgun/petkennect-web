import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import clientDetailDuck from '@reducers/client/detail'

import clientCommentDuck from '@reducers/client/comment'

const { types, selectors } = clientCommentDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const clientDetail = yield select(clientDetailDuck.selectors.detail)
    const filters = yield select(selectors.filters)
    const results = yield call(Get, `/clients/${clientDetail.item.id}/comments/`,filters)

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
