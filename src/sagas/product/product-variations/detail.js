import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import productVariationsDetailDuck from '@reducers/product/product-variations/detail'
import productFamiliesDetailDuck from '@reducers/product/product-families/detail'

import { v4 as uuidv4 } from 'uuid'

const { types } = productVariationsDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    const { item : { id: product_id } = {} } = yield select(productFamiliesDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `products/${product_id}/variations/${id}/`)

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
    const product = yield call(Get, `products/${id}/variations`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: product
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

    const result = yield call(Post, `products/${payload.product}/variations/`, {
      sku_id    : uuidv4(),
      stock     : '1',
      is_active : true,
      price     : '1',
      attributes: payload.attributes
    })
    yield put({ type: types.POST_FULFILLED, payload: { payload: result } })
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

    yield call(Patch, `products/${payload.product}/variations/${payload.id}/`, {
      product  : payload.product,
      sku_id   : payload.sku_id,
      is_active: payload.is_active,
      stock    : payload.stock,
      price    : payload.price
    })

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
