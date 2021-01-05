import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import petDaycampReservationDuck from '@reducers/pet/reservation/daycamp-reservation'

const { types, selectors } = petDaycampReservationDuck

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
        items: _times(10, index => ({
          id      : index,
          date    : faker.date.future(),
          location: '01-RH',
          type    : faker.random.words(),
          timeout : '7:36 AM',
          run     : 'A15',
          lunch   : 'Yes',
          yard    : faker.random.words()
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
