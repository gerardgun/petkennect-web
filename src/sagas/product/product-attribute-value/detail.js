import { call, put, takeEvery } from 'redux-saga/effects'
import { Delete, Post, Patch } from '@lib/utils/http-client'

import productAttributeValueDetailDuck from '@reducers/product/product-attribute-value/detail'

const { types } = productAttributeValueDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })
    yield call(Delete, `product-attribute-values/${id}`)
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
    const result = yield call(Post, 'product-attribute-values/', {
      product_attribute: payload.product_attribute,
      display_value    : payload.display_value,
      value            : payload.value == null ? payload.display_value : payload.value
    })

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

    yield call(Patch, `/product-attribute-values/${payload.id}/`, {
      product_attribute: payload.product_attribute,
      display_value    : payload.display_value,
      value            : payload.value == null ? payload.display_value : payload.value
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
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
