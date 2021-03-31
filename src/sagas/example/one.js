import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import exampleOneDuck from '@reducers/example/one'

const { selectors, types } = exampleOneDuck

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
          species_name: 'Dog',
          breed_name  : faker.random.arrayElement([ 'Affenpinscher', 'Affenpinscher-X', 'Afghan Hound', 'Afghan Hound-X', 'Akita', 'Akita-X', 'Shitzu' ]),
          coloring    : faker.random.arrayElement([ 'Black and White', 'Blond', 'Black, Brown', 'Gray / Brown' ]),
          size        : faker.random.arrayElement([ 'Small', 'Medium', 'Large', 'Giant' ]),
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
