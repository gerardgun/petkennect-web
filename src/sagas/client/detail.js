import { call, put, takeEvery } from 'redux-saga/effects'

import { Get, Post, Patch } from '@lib/utils/http-client'

import clientDetailDuck from '@reducers/client/detail'
import zipDetailDuck from '@reducers/zip/detail'

const { types } = clientDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Post, 'clean-clients/', {
      customer_ids: ids
    })

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

    const client = yield call(Get, `clients/${id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: client
      }
    })

    if(client.zip_code)
      yield put({
        type: zipDetailDuck.types.GET,
        id  : client.zip_code
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

    const result = yield call(Post, 'clients/', payload)

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

function* _put({ payload }) {
  try {
    yield put({ type: types.PUT_PENDING })

    if('email' in payload)
      delete payload.email

    yield call(Patch, `clients/${payload.id}/`, payload)

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
