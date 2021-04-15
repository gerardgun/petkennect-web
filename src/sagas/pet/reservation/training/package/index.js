import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'

import petTrainingPackageDuck from '@reducers/pet/reservation/training/package'

const { types, selectors } = petTrainingPackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const list = yield select(selectors.list)
    let id  = 1
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
        items: Array.from({ length: 3 }, index => ({
          id           : id++,
          description  : faker.random.arrayElement([ 'Puppy Preschool', 'Agility 1', '4 Week Day Train' ]),
          trainer      : faker.name.firstName(),
          starting_date: faker.date.future(),
          type         : faker.random.arrayElement([ 'Obedience', 'Sport', 'Behaviorial' ]),
          purchased    : faker.date.future(),
          contract     : faker.random.arrayElement([ 'Paid In Full', 'Refunded', 'Canceled' ]),
          status       : faker.random.arrayElement([ 'Signed', 'N/A', 'Unsigned' ])
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
