import faker from 'faker'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import employeeDuck from '@reducers/employee'

const { selectors, types } = employeeDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, 'employees/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => ({
          ...item,
          thumbnail_path       : item.thumbnail_path ? `https://petkennect-collection.s3.us-east-2.amazonaws.com/${item.thumbnail_path}` : null,
          // For mockup appointment capacity module
          role_name            : faker.random.arrayElement([ 'Groomer', 'Trainer', 'Bather', 'Dog Walker' ]),
          service_name         : faker.random.arrayElement([ 'Grooming', 'Bathing', 'Training', 'Dog Walking' ]),
          applies              : faker.random.arrayElement([ 'All', 'Bath and Brush Large, Bath Brush Small', 'Bathing', 'Training', 'Dog Walking' ]),
          max_scheduled_per_day: faker.random.arrayElement([ 3, 4, 5, 6, 4, 5, 7 ])
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
