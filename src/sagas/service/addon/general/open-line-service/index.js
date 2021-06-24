import { Get } from '@lib/utils/http-client'
import setupOpenLineAddonServiceSettingDuck from '@reducers/service/addon/general/open-line-service/'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'

const { types, selectors } = setupOpenLineAddonServiceSettingDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(
      Get,
      'services-variations/',
      filters
    )

    yield* locationSaga.get()
    const locationList = yield select(locationDuck.selectors.list)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map((addon) => {
          return {
            ...addon,
            /*
            price: {
              ...addon.prices[addon.prices.length - 1],
              started_at: moment(
                addon.prices[addon.prices.length - 1].started_at.split('T')[0]
              ).format('YYYY-MM-DD'),
              ended_at: moment(
                addon.prices[addon.prices.length - 1].ended_at.split('T')[0]
              ).format('YYYY-MM-DD')
            },
            */
            applies_locations: locationList.items
              .filter(({ id }) => addon.locations.includes(id))
              .map(({ name }) => name)
              .join(', ')
          }
        }),
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

export default [ takeEvery(types.GET, get) ]
