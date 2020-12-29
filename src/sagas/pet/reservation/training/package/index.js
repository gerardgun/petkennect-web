import { call, put, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import petTrainingPackageDuck from '@reducers/pet/reservation/training/package'

const { types } = petTrainingPackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

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
