import { call, put, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import petTrainingReservationDuck from '@reducers/pet/reservation/training/reservation'

const { types } = petTrainingReservationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(10, index => ({
          id          : index,
          package_name: '2 Week Day Train',
          type        : faker.random.words(),
          date        : faker.date.future(),
          trainer     : faker.name.firstName(),
          location    : '01-RH',
          run         : 'A15',
          comment     : faker.random.words(),
          status      : faker.random.arrayElement([ 'Paid In Full', 'Refunded', 'Canceled' ])
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
