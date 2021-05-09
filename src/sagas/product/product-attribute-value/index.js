import { put, select, takeEvery } from 'redux-saga/effects'

import * as productAttributeSaga from '@sagas/product/product-attribute'

import productAttributeDuck from '@reducers/product/product-attribute'
import productAttributeValueDuck from '@reducers/product/product-attribute-value'

const { selectors, types } = productAttributeValueDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield* productAttributeSaga.get()

    const productAttributeList = yield select(productAttributeDuck.selectors.list)

    const filters = yield select(selectors.filters)

    const productAttribute = productAttributeList.items.find(({ id }) => id === filters.product_attribute_id)

    let values = productAttribute.values

    if(filters.search) {
      const rgx = new RegExp(filters.search, 'i')

      values = values
        .filter(({ value_display }) => {
          return rgx.test(value_display)
        })
    }

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: values
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
