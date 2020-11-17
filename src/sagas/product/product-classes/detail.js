import { call, put, takeEvery } from 'redux-saga/effects'
import { Delete, Post, Get, Patch } from '@lib/utils/http-client'

import productClassesDetailDuck from '@reducers/product/product-classes/detail'

const { types } = productClassesDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })
    yield call(Delete, `product-families/${id}`)
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
    const product = yield call(Get, `product-families/${id}/`)

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
    const result = yield call(Post, 'product-families/', payload)

    if(payload.attributes.length > 0)
      for (let item of payload.attributes)
        yield call(Post, 'product-family-attributes/', {
          product_attribute: item,
          product_family   : result.id
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
    yield call(Patch, `/product-families/${payload.id}/`, payload)

    const attributeChange = yield call(Patch, `/product-families/${payload.id}/`, payload)

    if(attributeChange.attributes.length > 0)
      for (let item of attributeChange.family_attributes)
        yield call(Delete, `product-family-attributes/${item.id}`)

    if(payload.attributes.length > 0)
      for (let item of payload.attributes)
        yield call(Post, 'product-family-attributes/', {
          product_attribute: item,
          product_family   : payload.id
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
