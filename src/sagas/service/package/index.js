import faker from 'faker'
import { put, select, takeLatest } from 'redux-saga/effects'

// import { Get } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'

import locationDuck from '@reducers/location'
import servicePackageDuck from '@reducers/service/package'

const { selectors, types } = servicePackageDuck

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
    // eslint-disable-next-line no-unused-vars
    const filters = yield select(selectors.filters)
    // const list = yield select(selectors.list)

    // const { results } = yield call(Get, 'services/', filters)
    const results = [
      {
        id     : 1,
        name   : 'Package name 1',
        credits: 1
      },
      {
        id     : 2,
        name   : 'Package name 2',
        credits: 2
      },
      {
        id     : 3,
        name   : 'Package name 3',
        credits: 3
      }
    ]

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => ({
          ...item,
          // fake data to mockup services capacity settings
          applies_service_type: faker.random.arrayElement([ 'Grooming', 'Boarding', 'Training', 'Day Services' ]),
          applies_locations   : faker.random.arrayElement([ 'Location1', 'Location2' ]),
          is_active           : faker.random.boolean(),
          price               : faker.random.number(200),
          price_code          : faker.lorem.words(2),
          service_group       : faker.random.arrayElement([ 2, 3, 4, 5 ])
        })).filter(({ service_group }) => service_group === payload.service_group)
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
