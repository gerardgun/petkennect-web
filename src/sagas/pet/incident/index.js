import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petIncidentDuck from '@reducers/pet/incident'
import petDetailDuck from '@reducers/pet/detail'

const { types, selectors } = petIncidentDuck

function* get(/* { payload } */) {
  try {
    const { item : { id: pet_id } = {} } = yield select(petDetailDuck.selectors.detail)

    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, `/pets/${pet_id}/incidents/`,filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(({ employee_first_name = '-', employee_last_name = '', ...rest })=> ({
          ...rest, employee_fullname: `${employee_first_name} ${employee_last_name}`
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
