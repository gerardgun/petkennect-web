import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import ReservationBoardingDuck from '@reducers/pet/reservation/boarding'

const { types, selectors } = ReservationBoardingDuck

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
          id              : index,
          kennel          : 'shared',
          reserved_at     : faker.date.future(),
          check_in_date   : faker.date.future(),
          check_out_date  : faker.date.future(),
          location_code   : '01-RH',
          night           : 2,
          type            : '',
          est_cost_of_stay: '240',
          email_on        : faker.date.future()
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
