import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Post } from '@lib/utils/http-client'

import productOptionDetailDuck from '@reducers/product/option/detail'

const { selectors, types } = productOptionDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    const detail = yield select(selectors.detail)

    yield call(Delete, `/products/${detail.item.id}/options/${id}/`)

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

    yield call(Post, `/products/${payload.product_id}/options/${payload.id}/`, {
      product_attribute: payload.product_attribute_id
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

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.POST, post)
]
