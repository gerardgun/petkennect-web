import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Get } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import reservationGroomingDuck from '@reducers/pet/reservation/grooming'

import moment from 'moment'

const { types, selectors } = reservationGroomingDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const petDetail = yield select(petDetailDuck.selectors.detail)

    // const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta  } = yield call(Get, `/pets/${petDetail.item.id}/reservations/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.filter(_item => _item.service_type === 'G').map(({ employee_first_name = '-', employee_last_name = '', reserved_at = '',...rest })=> ({
          employee_fullname: `${employee_first_name} ${employee_last_name}`,
          is_pending       : moment.utc(rest.reserved_at, 'YYYY-MM-DD HH-mm:ss Z')
            .isSameOrAfter(moment(),'day'),
          reserved_at     : `${reserved_at}`,
          reserved_date   : moment.utc(`${reserved_at}`,'YYYY-MM-DD[T]HH:mm:ss').format('YYYY-MM-DD'),
          reserved_at_time: moment.utc(`${reserved_at}`).format('hh:mm:ss a'),
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
