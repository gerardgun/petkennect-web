import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import exampleTwoDuck from '@reducers/example/two'

const { selectors, types } = exampleTwoDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    yield call(() => new Promise(resolve => setTimeout(resolve, 1000)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(filters.page_size, index => ({
          id          : index + 1,
          rating_score: index + 1,
          rating_name : faker.lorem.words(2),
          description : faker.lorem.sentence(),
          disabled    : faker.random.boolean()
        })),
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
