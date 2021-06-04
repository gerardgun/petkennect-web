import faker from 'faker'
import { call, put, select, takeLatest } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'

import locationDuck from '@reducers/location'
import dayServicesDuck from '@reducers/service/package/day-services'

const { selectors, types } = dayServicesDuck

function* get({ payload }) {
  try {
    // eslint-disable-next-line no-restricted-syntax
    console.log(payload)
    yield put({ type: types.GET_PENDING })

    // Load related entities
    let locationList = yield select(locationDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    // Load items
    const filters = yield select(selectors.filters)
    // const list = yield select(selectors.list)

    const { results } = yield call(Get, 'services/', filters) // change correct info

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
          // fake data to mockup services capacity settings
          applies_service_type: faker.random.arrayElement([ 'Grooming', 'Boarding', 'Training', 'Day Services' ]),
          applies_locations   : faker.random.arrayElement([ 'Location1', 'Location2' ]),
          is_active           : faker.random.boolean(),
          price               : faker.random.number(200),
          price_code          : faker.lorem.words(2)
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
  takeLatest(types.GET, get)
]
