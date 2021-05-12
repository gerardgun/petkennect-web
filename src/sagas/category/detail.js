import { call, put, takeEvery } from 'redux-saga/effects'

import { Post , Delete, Patch } from '@lib/utils/http-client'

import categoryDetailDuck from '@reducers/category/detail'

const { types } = categoryDetailDuck

function* deleteItem({ ids: [ id ]  }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `product-categories/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    yield call(Post, 'product-categories/', payload)

    yield put({
      type: types.POST_FULFILLED
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

    yield call(Patch, `product-categories/${payload.id}/`, payload)

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
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
