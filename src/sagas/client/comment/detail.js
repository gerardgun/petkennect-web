import { call, put,  select, takeEvery } from 'redux-saga/effects'

import { Delete, Patch, Post } from '@lib/utils/http-client'

import clientCommentDuck from '@reducers/client/comment'
import clientCommentDetailDuck from '@reducers/client/comment/detail'
import clientDetailDuck from '@reducers/client/detail'

const { types } = clientCommentDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    const clientDetail = yield select(clientDetailDuck.selectors.detail)
    const clientComment = yield select(clientCommentDuck.selectors.list)

    yield call(Delete, `clients/${clientDetail.item.id}/comments/${id}/`)

    const index = clientComment.items.findIndex(item => item.id === id)

    if(index !== -1) {
      let items = [ ...clientComment.items ]

      items.splice(index, 1)

      yield put({
        type   : clientCommentDuck.types.SET,
        payload: {
          items
        }
      })
    }

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* post({ payload: { client_id, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `clients/${client_id}/comments/`, payload)

    const clientComment = yield select(clientCommentDuck.selectors.list)

    yield put({
      type   : clientCommentDuck.types.SET,
      payload: {
        items: [ result, ...clientComment.items ]
      }
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

    const result = yield call(Patch, `clients/${client_id}/comments/${id}/`, payload)

    const clientComment = yield select(clientCommentDuck.selectors.list)

    yield put({
      type   : clientCommentDuck.types.SET,
      payload: {
        items: clientComment.items.map(item => {
          return item.id === result.id ? result : item
        })
      }
    })

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
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
