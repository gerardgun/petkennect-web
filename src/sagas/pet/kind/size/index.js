import faker from 'faker'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import petKindSizeDuck from '@reducers/pet/kind/size'

const { selectors, types } = petKindSizeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // const petKindSizes = yield call(Get, '/pet-classes/', filters)
    const petKindSizes = _times(8, index => {
      return {
        id                  : index,
        species_name        : faker.random.arrayElement([ 'Dog', 'Cat', 'Rabbit', 'Bird' ]),
        name                : faker.random.arrayElement([ 'Mini', 'Small', 'Medium', 'Large' ]),
        max_capacity_per_day: faker.random.arrayElement([ 10, 15, 30, 35, 50, 70, 100 ])
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petKindSizes
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
