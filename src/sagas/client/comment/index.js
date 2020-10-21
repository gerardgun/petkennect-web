import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import clientCommentDuck from '@reducers/client/comment'

const { types, selectors } = clientCommentDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const { client_id, ...filters } = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, `/clients/${client_id}/comments/`, filters)

    const items = [ ...list.items, ...results ]
    // BEGIN Improve
    // Backend Solicitar que se haga filtro por follow_up para filtrar los comentarios pendientes para resolver
    const pending_comments = items.filter(item => item.follow_up)
    // END Improve

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        pending_comments,
        items,
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
