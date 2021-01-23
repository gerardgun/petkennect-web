import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Get } from '@lib/utils/http-client'
import moment from 'moment'
import petDetailDuck from '@reducers/pet/detail'
import petTrainingReservationDuck from '@reducers/pet/reservation/training/reservation'

const { types, selectors } = petTrainingReservationDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const petDetail = yield select(petDetailDuck.selectors.detail)

    // const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta  } = yield call(Get, `/pets/${petDetail.item.id}/reservations/`)

    const filterdResults = results.filter(_item => _item.service_type === 'T')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: filterdResults.map(({ employee_first_name = '-', employee_last_name = '', reserved_at = '' ,...rest })=> ({
          employee_fullname: `${employee_first_name} ${employee_last_name}`,
          is_pending       : moment.utc(rest.reserved_at, 'YYYY-MM-DD HH-mm:ss Z')
            .isSameOrAfter(moment(),'day'),
          reserved_at     : `${reserved_at}`,
          reserved_at_time: moment(`${reserved_at}`).format('hh:mm:ss a'),
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
