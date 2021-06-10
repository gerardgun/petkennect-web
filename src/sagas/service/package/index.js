import faker from 'faker'
import { put, select, takeLatest } from 'redux-saga/effects'

// import { Get } from '@lib/utils/http-client'
import servicePackageDuck from '@reducers/service/package'

const { selectors, types } = servicePackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // Load items
    const filters = yield select(selectors.filters)

    /*
    const { results } = yield call(Get, 'packages/', filters)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results
      }
    })
    */

    /* codigo momentaneo hasta que se implemente los endpoints */
    const list = yield select(selectors.list)
    const results = filters.search
      ? list.items.filter(({ name }) => name.indexOf(filters.search) > -1)
      : [
        {
          id                  : 1,
          name                : 'Package name 1',
          credits             : 1,
          service_group       : 2,
          applies_service_type: { id: 2, name: 'Service Type Name' }
        },
        {
          id                  : 2,
          name                : 'Package name 2',
          credits             : 2,
          service_group       : 3,
          applies_service_type: { id: 13, name: 'Service Type Name' }
        },
        {
          id                  : 3,
          name                : 'Package name 3',
          credits             : 3,
          service_group       : 4,
          applies_service_type: { id: 14, name: 'Service Type Name' }
        },
        {
          id                  : 4,
          name                : 'Package name 3',
          credits             : 4,
          service_group       : 5,
          applies_service_type: { id: 3, name: 'Service Type Name' }
        }
      ].filter(
        ({ service_group }) => service_group === filters.service_group
      )

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map((item) => ({
          ...item,
          // fake data to mockup services package settings
          applies_locations: [
            { id: 8, name: 'Location one' },
            { id: 9, name: 'Location two' }
          ],
          applies_reservation_types: [],
          is_active                : faker.random.boolean(),
          price                    : faker.random.number(200),
          price_code               : faker.lorem.words(2)
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

export default [ takeLatest(types.GET, get) ]
