import { call, put, select, takeEvery } from 'redux-saga/effects'
import _kebabCase from 'lodash/kebabCase'

import { Delete, Post, Patch } from '@lib/utils/http-client'

import productAttributeValueDetailDuck from '@reducers/product/product-attribute-value/detail'

const { selectors, types } = productAttributeValueDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    const detail = yield select(selectors.detail)

    yield call(Delete, `/product-attributes/${detail.product_attribute_id}/values/${id}/`)

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

    yield call(Post, `/product-attributes/${payload.product_attribute_id}/values/`, {
      value_display: payload.value_display,
      value        : 'value' in payload ? payload.value : _kebabCase(payload.value_display)
    })

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

    yield call(Patch, `/product-attributes/${payload.product_attribute_id}/values/${payload.id}/`, {
      value_display: payload.value_display,
      value        : 'value' in payload ? payload.value : _kebabCase(payload.value_display)
    })

    yield put({
      type: types.PUT_FULFILLED
    })
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
