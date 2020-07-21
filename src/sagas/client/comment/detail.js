import { call, put,  select, takeEvery } from 'redux-saga/effects'

import { Post, Patch,Get } from '@lib/utils/http-client'

import clientCommentDetailDuck from '@reducers/client/comment/detail'
import clientDetailDuck from '@reducers/client/detail'
// import locationDuck from '@reducers/location'

const { types } = clientCommentDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    const clientDetail = yield select(clientDetailDuck.selectors.detail)

    yield call(Post, `clients/${clientDetail.item.id}/clean-comments/`, {
      client_comment_ids: ids
    })

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get(client_id, id) {
  try {
    yield put({ type: types.GET_PENDING })

    const clientComment = yield call(Get,`clients/${client_id}/comments/${id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: clientComment
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload: { client_id, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    // const { selector : { selected_items = [] } = {} } = yield select(locationDuck.selectors.list)

    // const id = selected_items.map(({ id })=> id)

    yield call(Post, `clients/${client_id}/comments/`, {
      location : 1,
      employee : payload.employee,
      comment  : payload.comment,
      follow_up: payload.follow_up
    })

    yield put({ type: types.POST_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload: { client_id, id, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `clients/${client_id}/comments/${id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
