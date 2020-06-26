import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import vaccinationDuck from '@reducers/pet/vaccination'

const { types, selectors } = vaccinationDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const petDetail = yield select(petDetailDuck.selectors.detail)

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)
    const { results, ...meta } = yield call(Get, `/pets/${petDetail.item.id}/vaccinations/`,filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(({ verifier_employee_name = '-', verifier_employee_lastname = '', ...rest }) => ({
          employee_fullname: `${verifier_employee_name} ${verifier_employee_lastname}`,
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
