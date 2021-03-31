import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'

import notificationDuck from '@reducers/notification'

const { types, selectors } = notificationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: Array.from({ length: filters.page_size }, index => ({
          id        : index,
          comment   : faker.random.words(),
          from_date : faker.date.recent(),
          to_date   : faker.date.future(),
          location  : faker.random.arrayElement([ 'SA-03', 'SH-01', 'GF-03', 'SB8' ]),
          status    : faker.random.boolean(),
          created_by: faker.name.firstName()
        }))
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
