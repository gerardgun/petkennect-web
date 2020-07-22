import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Post, Patch } from '@lib/utils/http-client'

import clientDocumentDetailDuck from '@reducers/client/document/detail'
import clientDetailDuck from '@reducers/client/detail'

const { types } = clientDocumentDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    const clientDetail = yield select(clientDetailDuck.selectors.detail)

    yield call(Post, `clients/${clientDetail.item.id}/clean-documents/`, {
      client_document_ids: ids
    })

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

function* post({ payload :{ client_id,  ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    yield call(Post, `clients/${client_id}/documents/`, { ...payload })

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

    yield call(Patch, `clients/${client_id}/documents/${id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* sendEmail({ payload }) {
  try {
    // selector.selected_items
    const { item : { id:client_id } = {} } = yield select(clientDetailDuck.selectors.detail)
    const { item : { id: client_document_id } = {} } = yield select(clientDocumentDetailDuck.selectors.detail)

    yield put({ type: types.SEND_EMAIL_PENDING })
    const result = yield call(Post, `clients/${client_id}/documents/${client_document_id}/send-email/`, {
      body_title: payload.subject,
      ...payload
    })

    yield put({
      type   : types.SEND_EMAIL_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.SEND_EMAIL_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.SEND_EMAIL, sendEmail)
]
