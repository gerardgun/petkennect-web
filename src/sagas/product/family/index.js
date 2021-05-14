import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import * as productAttributeSaga from '@sagas/product/product-attribute'

import productAttributeDuck from '@reducers/product/product-attribute'
import productFamilyDuck from '@reducers/product/family'

const { selectors, types } = productFamilyDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    let productAttributeList = yield select(productAttributeDuck.selectors.list)

    if(productAttributeList.items.length === 0) {
      yield* productAttributeSaga.get()

      productAttributeList = yield select(productAttributeDuck.selectors.list)
    }

    const filters = yield select(selectors.filters)

    let families = yield call(Get, '/product-families/')

    if(filters.search) {
      const rgx = new RegExp(filters.search, 'i')

      families = families
        .filter(({ name }) => {
          return rgx.test(name)
        })
    }

    families = families.map(family => ({
      ...family,
      attributes: family.attributes.map(item => {
        const attribute = productAttributeList.items
          .find(({ id }) => id === item.product_attribute)

        return {
          name: attribute.name,
          ...item
        }
      })
    }))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: families
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
