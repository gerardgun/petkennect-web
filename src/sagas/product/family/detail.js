import { all, call, put, takeEvery } from 'redux-saga/effects'

import { ProtectedProductFamilyType } from '@lib/constants/product'
import { Delete, Get, Patch, Post } from '@lib/utils/http-client'

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
      payload.attributes.map(attrId => {
        return call(Post, 'product-family-attributes/', {
          product_family   : result.id,
          product_attribute: attrId
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

    const result = yield call(Get, `/product-families/${payload.id}/`)
    const isProtected = Object.keys(ProtectedProductFamilyType).includes(result.type)

    if(!isProtected)
      yield call(Patch, `/product-families/${payload.id}/`, payload)

    // Add new product attribute ids to the product family
    const productAttributeIdsToAdd = payload.attributes.filter(attrId => {
      return !result.attributes.includes(attrId)
    })

    yield all(
      productAttributeIdsToAdd.map(attrId => {
        return call(Post, 'product-family-attributes/', {
          product_family   : payload.id,
          product_attribute: attrId
        })
      })
    )

    // Delete product attribute ids from the product family
    const productFamilyAttrIdsToDelete = result.family_attributes
      .filter(item => {
        return !payload.attributes.includes(item.attribute.id)
      })
      .map(item => item.id)

    yield all(
      productFamilyAttrIdsToDelete.map(attrId => {
        return call(Delete, `product-family-attributes/${attrId}/`)
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
