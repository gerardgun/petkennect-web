import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import categoryDuck from '@reducers/category'

const { selectors, types } = categoryDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    let categories = yield call(Get, 'product-categories/')

    if(filters.search) {
      const rgx = new RegExp(filters.search, 'i')

      categories = categories
        .filter(({ name }) => {
          return rgx.test(name)
        })
    }

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: categories
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
