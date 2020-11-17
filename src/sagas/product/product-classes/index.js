import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import productClassesDuck from '@reducers/product/product-classes'

const { types } = productClassesDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const productClassesAttributes = yield call(Get, '/product-families/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: productClassesAttributes.map((_item)=>{
          return ({ attributesName: _item.family_attributes.map((_family_attributes) => {
            return _family_attributes.attribute.name
          }).join(','), ..._item })
        })
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
