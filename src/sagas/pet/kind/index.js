import faker from 'faker'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'

import locationDuck from '@reducers/location'
import petKindDuck from '@reducers/pet/kind'

const { selectors, types } = petKindDuck

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // Load related entities
    let locationList = yield select(locationDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    // Load items
    const filters = yield select(selectors.filters)

    const petKinds = yield call(Get, '/pet-classes/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petKinds.map(item => ({
          ...item,
          locations: item.locations.map(locationId => {
            const location = locationList.items
              .find(({ id }) => id === locationId)

            return location
          }),
          // Fake data to mockup service capacity section
          max_capacity_per_day: faker.random.arrayElement([ 30, 50, 70, 100 ])
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
