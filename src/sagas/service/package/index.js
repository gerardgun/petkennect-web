import faker from 'faker'
import { call, put, select, takeLatest } from 'redux-saga/effects'

// import { Get } from '@lib/utils/http-client'
import servicePackageDuck from '@reducers/service/package'
import { Get } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'

const { selectors, types } = servicePackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // Load items
    const filters = yield select(selectors.filters)
    const results = yield call(Get, 'services-variations/', {
      ...filters,
      ordering: 'id'
    })

    yield* locationSaga.get()
    const locationList = yield select(locationDuck.selectors.list)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => {
          return {
            ...item,
            applies_locations        : locationList.items.filter(({ id }) => item.locations.includes(id)),
            service                  : item.service.id,
            applies_service_type     : item.service,
            credits                  : item.config.credits,
            days_valid               : item.config.days_valid,
            days                     : item.config.days,
            is_limited               : item.config.is_limited,
            is_hourly_credits        : item.config.is_hourly_credits,
            is_suscription           : item.config.is_suscription,
            frequency                : item.config.frequency,
            is_active                : faker.random.boolean(),
            price_id                 : item.prices.length > 0 ? item.prices[0].id : null,
            price                    : item.prices.length > 0 ? item.prices[0].price : 0,
            price_code               : faker.lorem.words(2),
            applies_reservation_types: []
          }
        })
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

export default [ takeLatest(types.GET, get) ]
