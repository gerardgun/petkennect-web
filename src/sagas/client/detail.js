import { call, put, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import { Get, Post, Patch } from '@lib/utils/http-client'

import clientDetailDuck from '@reducers/client/detail'
import zipDetailDuck from '@reducers/zip/detail'

const { types } = clientDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Post, 'clean-clients/', {
      client_ids: ids
    })

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

export function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const client = yield call(Get, `clients/${id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          ...client,
          thumbnail_path: client.thumbnail_path ? `https://petkennect-collection.s3.us-east-2.amazonaws.com/${client.thumbnail_path}` : null,
          status        : faker.random.arrayElement([ 'Decline Client', 'VIP Client', 'Caution', 'Active' ])
        }
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

    let result = null

    if(payload.user) result = yield call(Post, 'profile-clients/', payload)
    else result = yield call(Post, 'clients/', payload)

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
