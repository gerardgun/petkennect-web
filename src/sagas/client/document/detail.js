import { all, call, put, takeEvery, select } from 'redux-saga/effects'

import { Post, Patch } from '@lib/utils/http-client'

import authDuck from '@reducers/auth'
import clientDocumentDuck from '@reducers/client/document'
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

function* post({ payload: { client_id,  ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    payload.files.forEach(item => {
      if(!String(item.description).trim()) delete item.description
    })

    yield all(
      payload.files.map(item => (
        call(Post, `clients/${client_id}/documents/`, item)
      ))
    )

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

    if(!String(payload.description).trim()) delete payload.description

    yield call(Patch, `clients/${client_id}/documents/${id}/`, payload)

    yield put({ type: clientDocumentDuck.types.REMOVE_IDS })

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* sendEmail({ payload: { id, client_id, ...payload } }) {
  try {
    yield put({ type: types.SEND_PENDING })

    const authDetail = yield select(authDuck.selectors.detail)
    const authUserFullName = `${authDetail.item.first_name} ${authDetail.item.last_name}`

    const result = yield call(Post, `clients/${client_id}/documents/${id}/send-email/`, {
      body_title: `${authUserFullName} shared a document with you`,
      ...payload
    })

    yield put({
      type   : types.SEND_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.SEND_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  // takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.SEND, sendEmail)
]
