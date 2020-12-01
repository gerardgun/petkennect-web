import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Get } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import reservationDuck from '@reducers/pet/reservation'

import moment from 'moment'

const { types, selectors } = reservationDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const petDetail = yield select(petDetailDuck.selectors.detail)

    const filters = yield select(selectors.filters)
    // const list = yield select(selectors.list)

    const { results/* ...meta */ } = yield call(Get, `/pets/${petDetail.item.id}/reservations/`,filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(({ employee_first_name = '-', employee_last_name = '',...rest })=> ({
          employee_fullname: `${employee_first_name} ${employee_last_name}`,
          is_pending       : moment.utc(rest.reserved_at, 'YYYY-MM-DD HH-mm:ss Z')
            .isSameOrAfter(moment(),'day'),
          ...rest
        }))
        // pagination: {
        //   ...list.pagination,
        //   meta
        // }
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
