import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import { ProtectedProductFamilyType } from '@lib/constants/product'
import { Delete, Patch, Post } from '@lib/utils/http-client'

import productFamilyDuck from '@reducers/product/family'
import productFamilyDetailDuck from '@reducers/product/family/detail'

const { types } = productFamilyDetailDuck

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

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, 'product-families/', {
      name: payload.name
    })

    yield all(
      payload.attributes.map(id => {
        return call(Post, `/product-families/${result.id}/attributes/`, {
          product_attribute: id
        })
      })
    )

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

    const list = yield select(productFamilyDuck.selectors.list)

    const family = list.items.find(({ id }) => id === payload.id)
    const isProtected = Object.keys(ProtectedProductFamilyType).includes(family.type)

    if(!isProtected)
      yield call(Patch, `/product-families/${payload.id}/`, payload)

    // Add new product attribute ids to the product family
    const productAttributeIdsToAdd = payload.attributes.filter(attrId => {
      return !family.attributes
        .map(item => item.product_attribute)
        .includes(attrId)
    })

    yield all(
      productAttributeIdsToAdd.map(attrId => {
        return call(Post, `/product-families/${payload.id}/attributes/`, {
          product_attribute: attrId
        })
      })
    )

    // Delete product attribute ids from the product family
    const productFamilyAttrIdsToDelete = family.attributes
      .filter(item => {
        return !payload.attributes.includes(item.product_attribute)
      })
      .map(item => item.id)

    yield all(
      productFamilyAttrIdsToDelete.map(attrId => {
        return call(Delete, `/product-families/${payload.id}/attributes/${attrId}/`)
      })
    )

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
