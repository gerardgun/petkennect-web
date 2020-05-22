import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Post } from '@lib/utils/http-client'

import productDetailDuck from '@reducers/product/detail'
import productPackageDuck from '@reducers/product/package'
import productPackageDetailDuck from '@reducers/product/package/detail'

const { types } = productPackageDetailDuck
const { types : listTypes } = productPackageDuck

function* deleteItem(/* { ids: [ id ] }*/) {
  const productPackage = yield select(productPackageDuck.selectors.list)
  const { item : { id: product_id } = {} } = yield select(productDetailDuck.selectors.detail)

  const { item : { id: product_package_id } } = yield select(productPackageDetailDuck.selectors.detail)
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `packages/${product_id}/products/${product_package_id}/`)

    yield put({ type: types.DELETE_FULFILLED })
    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...productPackage.items.filter(_productPackage =>_productPackage.id !== product_package_id) ]
      }
    })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get(/* { id }*/) {
  try {
    yield put({ type: types.GET_PENDING })
    // const { item : { id: product_id } = {} } = yield select(productDetailDuck.selectors.detail)

    // const result = yield call(Get, `packages/${product_id}/products/${id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        // item: result
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
  const productPackage = yield select(productPackageDuck.selectors.list)
  try {
    const { item : { id: product_id } = {} } = yield select(productDetailDuck.selectors.detail)

    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `packages/${product_id}/products/`, payload)

    yield put({ type: types.POST_FULFILLED, payload: result })
    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...productPackage.items, result ]
      }
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { items } }) {
  try {
    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...items ]
      }
    })
    const { item : { id: product_id } = {} } = yield select(productDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    const result = yield call(Post, `packages/${product_id}/order-products/`, { products: items })

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
