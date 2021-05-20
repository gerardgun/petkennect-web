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
          type_id                   : faker.random.arrayElement([ 1, 2 ]),
          species_name              : faker.random.arrayElement([ 'Dog', 'Cat', 'Rabbit', 'Bird' ]),
          service_group_name        : faker.random.arrayElement([ 'Grooming', 'Boarding', 'Training', 'Day Services' ]),
          applies_service_type      : faker.random.arrayElement([ 'Grooming', 'Boarding', 'Training', 'Day Services' ]),
          applies                   : faker.random.arrayElement([ 'All or Tag Select' ]),
          applies_locations         : faker.random.arrayElement([ 'All or Tag Select' ]),
          applies_species           : faker.random.arrayElement([ 'Dog', 'Cat', 'Rabbit', 'Bird', 'All or Tag Select' ]),
          group_play_service_enabled: faker.random.boolean(),
          is_scheduled              : faker.random.boolean(),
          max_capacity_per_day      : faker.random.arrayElement([ 10, 15, 30, 35, 50, 70, 100 ]),
          time_offered              : faker.random.arrayElement([ 'Business Hours', 'Custom' ]),
          price                     : faker.random.number(200),
          price_code                : faker.lorem.words(2),
          price_type                : faker.random.arrayElement([ 'All Inclusive', 'Activity Based - Required', 'Activity Based - Optional' ]),
          charge_type               : faker.random.arrayElement([ 'Full Day', 'Appointment' ]),
          is_day_service_required   : faker.random.arrayElement([ true, false, null ]),
          duration_week             : faker.random.arrayElement([ 3, 4, 5, 6 ]),
          duration                  : faker.random.arrayElement([ 1, 2, 3, 4, 5, 6 ])
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
