import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post } from '@lib/utils/http-client'

import productImageDetailDuck from '@reducers/product/image/detail'
import productDetailDuck from '@reducers/product/detail'
import productImageDuck from '@reducers/product/image'

const { types } = productImageDetailDuck
const { types : listTypes } = productImageDuck

function* deleteItem(/* { ids: [ id ] }*/) {
  const productImage = yield select(productImageDuck.selectors.list)
  const { item : { id: product_id } = {} } = yield select(productDetailDuck.selectors.detail)

  const { item : { id: produc_image_id } } = yield select(productImageDetailDuck.selectors.detail)
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `products/${product_id}/images/${produc_image_id}/`)

    yield put({ type: types.DELETE_FULFILLED })
    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...productImage.items.filter(_productImage =>_productImage.id !== produc_image_id) ]
      }
    })
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
    const { item : { id: product_id } = {} } = yield select(productDetailDuck.selectors.detail)

    const result = yield call(Get, `products/${product_id}/images/${id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: result
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
  const productImage = yield select(productImageDuck.selectors.list)
  try {
    const { item : { id: product_id } = {} } = yield select(productDetailDuck.selectors.detail)

    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `products/${product_id}/images/`, payload)

    yield put({ type: types.POST_FULFILLED, payload: result })
    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...productImage.items, ...result ]
      }
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { product_images } }) {
  try {
    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...product_images ]
      }
    })
    const { item : { id: product_id } = {} } = yield select(productDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    const result = yield call(Post, `products/${product_id}/order-images/`, product_images)

    yield put({ type: types.PUT_FULFILLED, payload: result })
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
