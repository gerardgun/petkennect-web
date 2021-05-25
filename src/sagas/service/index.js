import faker from 'faker'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'
import * as petKindSaga from '@sagas/pet/kind'

import locationDuck from '@reducers/location'
import petKindDuck from '@reducers/pet/kind'
import serviceDuck from '@reducers/service'

const { selectors, types } = serviceDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // Load related entities
    let locationList = yield select(locationDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    let petKindList = yield select(petKindDuck.selectors.list)

    if(petKindList.items.length === 0) {
      yield* petKindSaga.get()

      petKindList = yield select(petKindDuck.selectors.list)
    }

    // Load items
    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, 'services/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => ({
          ...item,
          locations: item.locations.map(locationId => {
            const location = locationList.items
              .find(({ id }) => id === locationId)

            return location
          }),
          pet_classes: item.pet_classes.map(petKindId => {
            const petKind = petKindList.items
              .find(({ id }) => id === petKindId)

            return petKind
          }),
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
  takeLatest(types.GET, get)
]
