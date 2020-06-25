import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import reservationDuck from '@reducers/reservation'

const { types, selectors } = reservationDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, '/reservations/',filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(({ employee_first_name = '-', employee_last_name = '', ...rest }) => ({
          employee_fullname: `${employee_first_name} ${employee_last_name}`,
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
