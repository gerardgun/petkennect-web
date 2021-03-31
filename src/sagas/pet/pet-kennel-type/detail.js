import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petKennelTypeDetailDuck from '@reducers/pet/pet-kennel-type/detail'

const { types } = petKennelTypeDetailDuck

function* deleteItem({ ids: [ kennel_type_id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `kennel-types/${kennel_type_id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ kennel_type_id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const petKennelType = yield call(Get, `kennel-types/${kennel_type_id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: petKennelType
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

    const result = yield call(Post, 'kennel-types/', payload)

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

    yield call(Patch, `kennel-types/${payload.id}/`, payload)

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
