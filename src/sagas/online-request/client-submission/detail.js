import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'
import { get as getClient } from '@sagas/client/detail'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'
import clientDocumentDuck from '@reducers/client/document'
import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'

const { types } = clientSubmissionDetailDuck

function* deleteItem(/* { ids } */) {
  try {
    const petDetail = yield select(clientSubmissionDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pets/${petDetail.item.id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const item = yield call(Get, `/requests/${id}/`)

    yield* getClient({ id: item.client.id })

    const clientDetail = yield select(clientDetailDuck.selectors.detail)

    // Get Client Pets
    yield put({
      type   : clientPetDuck.types.GET,
      payload: { client__id: clientDetail.item.id, verified: false }
    })

    // Get Client Documents
    yield put({
      type   : clientDocumentDuck.types.GET,
      payload: { client_id: clientDetail.item.id }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* patch({ payload: { id, ...payload } }) {
  try {
    yield put({ type: types.PATCH_PENDING })

    yield call(Patch, `requests/${id}/`, payload)

    yield put({ type: types.PATCH_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PATCH_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, 'pets/', payload)

    yield put({
      type   : types.POST_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload: { id, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `pets/${id}/`, payload)

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
  takeEvery(types.PATCH, patch),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
