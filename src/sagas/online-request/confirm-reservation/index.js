import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import confirmReservationDuck from '@reducers/online-request/confirm-reservation'

const { types, selectors } = confirmReservationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // const clients = yield call(Get, '/client')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(filters.page_size, index => ({
          id      : index,
          client  : faker.name.firstName(),
          pet     : faker.name.lastName(),
          res_type: faker.name.firstName(),
          email   : faker.internet.email(),
          mobile  : faker.phone.phoneNumber(),
          location: '02-RH',
          notes   : 'view',
          ready   : faker.random.boolean()
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
