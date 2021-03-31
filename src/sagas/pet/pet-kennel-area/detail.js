import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petKennelAreaDetailDuck from '@reducers/pet/pet-kennel-area/detail'

const { types } = petKennelAreaDetailDuck

function* deleteItem({ ids: [ kennel_area ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `kennel-areas/${kennel_area}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ kennel_area }) {
  try {
    yield put({ type: types.GET_PENDING })

    const petKennelArea = yield call(Get, `kennel-areas/${kennel_area}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: petKennelArea
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

    const result = yield call(Post, 'kennel-areas/', payload)

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

    yield call(Patch, `kennel-areas/${payload.id}/`, payload)

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
