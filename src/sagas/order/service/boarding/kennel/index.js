import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import orderServiceBoardingKennelDuck from '@reducers/order/service/boarding/kennel'

const { selectors, types } = orderServiceBoardingKennelDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    // const kennels = yield call(Get, '/pet-classes/')
    const kennels = _times(filters.page_size, index => {
      return {
        id         : index,
        code       : faker.lorem.words(1) + faker.random.number(100),
        type_name  : faker.lorem.sentence(3),
        description: faker.lorem.sentence(6)
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items     : kennels,
        pagination: {
          ...list.pagination,
          meta: {
            last_page   : 20,
            current_page: filters.page,
            page_size   : filters.page_size,
            total_items : 20 * filters.page_size,
            from        : filters.page_size * filters.page - filters.page_size + 1,
            to          : filters.page_size * filters.page
          }
        }
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
