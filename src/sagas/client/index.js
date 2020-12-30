import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import { Get } from '@lib/utils/http-client'

import clientDuck from '@reducers/client'

const { selectors, types } = clientDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    const { results, ...meta } = yield call(Get, 'clients/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => ({
          ...item,
          thumbnail_path: item.thumbnail_path ? `https://petkennect-collection.s3.us-east-2.amazonaws.com/${item.thumbnail_path}` : null,
          status        : faker.random.arrayElement([ 'Decline Client', 'VIP Client', 'Caution', 'Active' ]),
          has_card      : faker.random.boolean()
        })),
        pagination: {
          ...list.pagination,
          meta
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
