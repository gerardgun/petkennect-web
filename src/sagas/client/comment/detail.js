import { call, put, takeEvery } from 'redux-saga/effects'
import faker from 'faker'

import {  Post, Put } from '@lib/utils/http-client'

import clientCommentDetailDuck from '@reducers/client/comment/detail'

const { types } = clientCommentDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Post, 'clean-client-comments/', {
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

function* get(/* { id } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const client = yield call(Get, `client/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          id         : 1,
          date       : faker.date.recent().toISOString().split('T')[0],
          staff_id   : 1,
          staff      : faker.name.firstName() + ' ' + faker.name.lastName(),
          location_id: 1,
          location   : '02-RH',
          comment    : faker.lorem.paragraph(),
          follow_up  : faker.random.boolean()
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

    yield call(Post, 'client-comments/', payload)

    yield put({ type: types.POST_FULFILLED })
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

    yield call(Put, `client-comments/${payload.id}/`, payload)

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
