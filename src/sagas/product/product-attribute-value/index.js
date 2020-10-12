import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import productAttributeValueDuck from '@reducers/product/product-attribute-value'

const { types } = productAttributeValueDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const productAttributes = yield call(Get, '/product-attributes/')

    let ProductAttributesValues = []

    productAttributes.filter(_ => _.id == payload)
      .forEach(_attributeValue => {
        _attributeValue.values.forEach(_values => {
          let attributeValue = {
            display_value    : _values.display_value,
            id               : _values.id,
            product_attribute: _values.product_attribute,
            value            : _values.value,
            type             : _attributeValue.type,
            isColorVisible   : _attributeValue.type === 'C' ? true : false
          }
          ProductAttributesValues.push(attributeValue)
        })
      })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: ProductAttributesValues
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
