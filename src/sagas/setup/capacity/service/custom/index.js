import { call, put, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

// import { Get } from '@lib/utils/http-client'

import setupCapacityServiceCustomDuck from '@reducers/setup/capacity/service/custom'

const { types } = setupCapacityServiceCustomDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    // const types = yield call(Get, '/pet-classes/')
    const items = _times(8, index => {
      return {
        id                  : index,
        start_at            : faker.date.future().toISOString(),
        ends_at             : faker.date.future().toISOString(),
        is_active           : faker.random.boolean(),
        species_name        : faker.random.arrayElement([ 'Dog', 'Cat', 'Rabbit', 'Bird' ]),
        service_group_name  : faker.random.arrayElement([ 'Grooming', 'Boarding', 'Training', 'Day Services' ]),
        service_name        : faker.lorem.sentence(3),
        reservation_name    : faker.lorem.sentence(3),
        max_capacity_per_day: faker.random.arrayElement([ 10, 15, 30, 35, 50, 70, 100 ]),
        reason_description  : faker.random.arrayElement([ 'Covid 19', 'Reason' ])
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items
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
