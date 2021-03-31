import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import daycampCardDetailDuck from '@reducers/pet/reservation/daycamp-card/detail'

const { types } = daycampCardDetailDuck

function* deleteItem({ ids: [ daycamp_card_id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `daycamp-cards/${daycamp_card_id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ daycamp_card_id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const daycampCard = yield call(Get, `daycamp-cards/${daycamp_card_id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: daycampCard
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

    const result = yield call(Post, 'daycamp-cards/', payload)

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

    yield call(Patch, `daycamp-cards/${payload.id}/`, payload)

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
