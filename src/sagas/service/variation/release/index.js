import { call, put, select, takeLatest } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'

import locationDuck from '@reducers/location'
import serviceVariationReleaseDuck from '@reducers/service/variation/release'

const { selectors, types } = serviceVariationReleaseDuck

function* get() {
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
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, 'service-variations-releases/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => ({
          ...item,
          locations: item.locations.map(locationId => {
            const location = locationList.items
              .find(({ id }) => id === locationId)

            return location
          })
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
