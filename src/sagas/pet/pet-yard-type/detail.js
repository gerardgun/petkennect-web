import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petYardTypeDetailDuck from '@reducers/pet/pet-yard-type/detail'

const { types } = petYardTypeDetailDuck

function* deleteItem({ ids: [ yard_type_id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `yard-types/${yard_type_id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ yard_type_id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const petYardType = yield call(Get, `yard-types/${yard_type_id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: petYardType
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

    const result = yield call(Post, 'yard-types/', payload)

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

    yield call(Patch, `yard-types/${payload.id}/`, payload)

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
