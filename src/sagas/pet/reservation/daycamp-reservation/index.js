import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Get } from '@lib/utils/http-client'
import faker from 'faker'

import moment from 'moment'

import petDetailDuck from '@reducers/pet/detail'
import petDaycampReservationDuck from '@reducers/pet/reservation/daycamp-reservation'

const { types, selectors } = petDaycampReservationDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const petDetail = yield select(petDetailDuck.selectors.detail)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta  } = yield call(Get, `/pets/${petDetail.item.id}/reservations/`,filters)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.filter(_ => _.service_type == 'D').map(({ employee_first_name = '-', employee_last_name = '', reserved_at = '', ...rest })=> ({
          employee_fullname: `${employee_first_name} ${employee_last_name}`,
          ischeckOut       : faker.random.arrayElement([ 'true','false' ]),
          reserved_at      : `${reserved_at}`,
          checkout_at      : moment.utc(`${rest.daycamp && rest.daycamp.checkout_at}`).format('hh:mm:ss a'),
          checkout         : `${rest.daycamp && rest.daycamp.checkout_at}`,
          yard_type        : `${rest.daycamp && rest.daycamp.yard_type}`,
          type             : `${rest.daycamp && rest.daycamp.type}`,
          reserved_at_time : moment.utc(`${reserved_at}`).format('hh:mm:ss a'),
          ...rest
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
  takeEvery(types.GET, get)
]
