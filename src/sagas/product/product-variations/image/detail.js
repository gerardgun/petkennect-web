import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post } from '@lib/utils/http-client'

import productVariationsDetailDuck from '@reducers/product/product-variations/detail'
import productVariationsImageDetailDuck from '@reducers/product/product-variations/image/detail'

const { types } = productVariationsImageDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    const productVariationsDetail = yield select(productVariationsDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `product-variations/${productVariationsDetail.item.id}/images/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get() {
  try {
    yield put({ type: types.GET_PENDING })
    const productVariationsDetail = yield select(productVariationsDetailDuck.selectors.detail)

    const productVariationsImage = yield call(Get, `product-variations/${productVariationsDetail.item.id}/images`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: productVariationsImage
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
    const productVariationsDetail = yield select(productVariationsDetailDuck.selectors.detail)
    const result = yield call(Post, `product-variations/${productVariationsDetail.item.id}/images/`, payload)
    yield put({ type: types.POST_FULFILLED, payload: { payload: result } })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post)
]
