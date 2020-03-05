import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import { Delete, Get, Post, Put } from '@lib/utils/http-client'

import clientInteractionDetailDuck from '@reducers/client/interaction/detail'

const { types, selectors } = clientInteractionDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    // yield call(Delete, `client/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 2000)))

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

    // const client = yield call(Get, `client/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          id: 1,
          date: faker.date.recent().toISOString().split('T')[0],
          staff: 1,
          location: 1,
          comment: faker.lorem.paragraph(),
          follow_up: faker.random.boolean()
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

    // yield call(Post, 'client', payload)
    yield call(() => new Promise(resolve => setTimeout(resolve, 2000)))

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
