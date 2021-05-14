import faker from 'faker'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import serviceDuck from '@reducers/service'

const { selectors, types } = serviceDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, 'services/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => ({
          ...item,
          // fake data to mockup services capacity settings
          type_name                 : faker.random.arrayElement([ 'Reservation', 'Appointment' ]),
          species_name              : faker.random.arrayElement([ 'Dog', 'Cat', 'Rabbit', 'Bird' ]),
          service_group_name        : faker.random.arrayElement([ 'Grooming', 'Boarding', 'Training', 'Day Services' ]),
          applies                   : faker.random.arrayElement([ 'All or Tag Select' ]),
          applies_locations         : faker.random.arrayElement([ 'All or Tag Select' ]),
          applies_species           : faker.random.arrayElement([ 'Dog', 'Cat', 'Rabbit', 'Bird', 'All or Tag Select' ]),
          group_play_service_enabled: faker.random.boolean(),
          is_scheduled              : faker.random.boolean(),
          max_capacity_per_day      : faker.random.arrayElement([ 10, 15, 30, 35, 50, 70, 100 ]),
          time_offered              : faker.random.arrayElement([ 'Business Hours', 'Custom' ]),
          price                     : faker.random.number(200),
          charge_type               : faker.random.arrayElement([ 'Full Day', 'Appointment' ])
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
