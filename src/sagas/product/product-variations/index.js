import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import productVariationsDuck from '@reducers/product/product-variations'

const { types } = productVariationsDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const productVariations = yield call(Get, `products/${payload}/variations`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        // items: productClassesAttributes.map((_item)=>{
        //   return ({ attributesName: _item.family_attributes.map((_family_attributes) => {
        //     return _family_attributes.attribute.name
        //   }).join(','), ..._item })
        // })
        items: productVariations
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.GET, get)
]
