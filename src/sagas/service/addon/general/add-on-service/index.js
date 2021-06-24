import { Get } from '@lib/utils/http-client'
import setupAddonServiceSettingDuck from '@reducers/service/addon/general/add-on-service/'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import moment from 'moment'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'
import _uniq from 'lodash/uniq'

const { types, selectors } = setupAddonServiceSettingDuck

function* get(/* { payload } */) {
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

    const reservationTypesList = yield call(Get, 'services-variations/', {
      ordering: 'name',
      type    : 'A,R'
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map((addon) => {
          const reservationSelecteds = reservationTypesList.filter(({ id }) =>
            addon.service_true_addon.service_variations.includes(id)
          )

          return {
            ...addon,
            price: {
              ...addon.prices[addon.prices.length - 1],
              started_at: moment(
                addon.prices[addon.prices.length - 1].started_at.split('T')[0]
              ).format('YYYY-MM-DD'),
              ended_at: moment(
                addon.prices[addon.prices.length - 1].ended_at.split('T')[0]
              ).format('YYYY-MM-DD')
            },
            service_groups: _uniq(
              reservationSelecteds.map(
                ({ service }) => service.service_group_id
              )
            ),
            service_group_names: _uniq(
              reservationSelecteds.map(
                ({ service }) => service.service_group_name
              )
            ).join(', '),
            service_types: _uniq(
              reservationSelecteds.map(({ service }) => service.id)
            ),
            service_type_names: _uniq(
              reservationSelecteds.map(({ service }) => service.name)
            ).join(', '),
            applies_locations: locationList.items
              .filter(({ id }) => addon.locations.includes(id))
              .map(({ name }) => name)
              .join(', '),
            applies_reservations: reservationTypesList
              .filter(({ id }) =>
                addon.service_true_addon.service_variations.includes(id)
              )
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
