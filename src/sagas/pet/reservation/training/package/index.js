import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import petTrainingPackageDuck from '@reducers/pet/reservation/training/package'

const { types, selectors } = petTrainingPackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const list = yield select(selectors.list)

    const meta = {
      current_page: 1,
      from        : 1,
      last_page   : 1,
      links       : { next: null, previous: null },
      page_size   : 15,
      to          : 14,
      total_items : 14 }

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(5, index => ({
          id           : index,
          package_name : '2 Week Day Train',
          trainer      : faker.name.firstName(),
          starting_date: faker.date.future(),
          reason       : 'Obedience',
          status       : faker.random.arrayElement([ 'Paid In Full', 'Refunded', 'Canceled' ])
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
