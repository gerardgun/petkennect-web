import { call, put, takeEvery , select } from 'redux-saga/effects'

// import { Delete, Get, Post, Put } from '@lib/utils/http-client'

import clientDocumentTypeDetailDuck from '@reducers/client/document/type/detail'
import { Post, Put, Delete } from '@lib/utils/http-client'

const { types } = clientDocumentTypeDetailDuck

function* deleteItem(/* { id }*/) {
  try {
    const clientDocumentTypeDetail = yield select(clientDocumentTypeDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `client-document-types/${clientDocumentTypeDetail.item.id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get(/* { id } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const client = yield call(Get, `client/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          id: 1
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

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    yield call(Post, 'client-document-types/', payload)

    yield put({ type: types.POST_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { id, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Put, `client-document-types/${id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // yield call(Put, `client/${payload.id}`, payload)

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
