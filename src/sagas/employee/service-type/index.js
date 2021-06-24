import { call, put, select, takeEvery } from 'redux-saga/effects'
import _uniq from 'lodash/uniq'

import { Get } from '@lib/utils/http-client'

import employeeServiceTypeDuck from '@reducers/employee/service-type'

const { selectors, types } = employeeServiceTypeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, '/employee-service-types/', filters)

    const service_type_ids = _uniq(results.map(({ service }) => service))

    const service_types = yield call(Get, 'services/', {
      id: service_type_ids.join()
    })

    const reservation_type_ids = _uniq(
      [].concat(...results.map(({ service_variations }) => service_variations))
    )

    const reservation_types = yield call(Get, 'services-variations/', {
      id: reservation_type_ids.join()
    })

    const employees = yield call(Get, 'employees/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => {
          const service_type = service_types.find(({ id }) => id === item.service)
          const employee = employees.find(({ id }) => id === item.employee)

          return {
            ...item,
            employee_id          : item.employee,
            employee,
            service_type,
            service_variation_ids: item.service_variations,
            service_variations   : item.service_variations.map(reservation_type_id => {
              const reservation_type = reservation_types.find(({ id }) => id === reservation_type_id)

              return reservation_type
            })
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

export default [
  takeEvery(types.GET, get)
]
