import { call, put, select, takeLatest } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'

import locationDuck from '@reducers/location'
import serviceVariationDuck from '@reducers/service/variation'

const { selectors, types } = serviceVariationDuck

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
    let filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    // BEGIN filter by service__type
    if(filters.service__type && !('service' in filters)) {
      const { results: services } = yield call(Get, 'services/', {
        service_group__type: filters.service__type === 'B' ? 'B' : 'T'
      })

      const boardingActivityService = services.find(({ type }) => type === filters.service__type)

      yield put({
        type   : types.SET_FILTERS,
        payload: {
          service: boardingActivityService.id
        }
      })

      filters = yield select(selectors.filters)
    }
    // END filter by service__type

    const { results, ...meta } = yield call(Get, 'services-variations/', filters)

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
