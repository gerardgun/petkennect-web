import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import vaccinationDuck from '@reducers/pet/vaccination'
import moment from 'moment'

const { types, selectors } = vaccinationDuck

function getStatus(item) {
  if(item.verified_at)
    return 'Verify!'
  if(moment
    .utc(item.expired_at, 'YYYY-MM-DD HH-mm:ss Z')
    .isSameOrBefore(
      moment()
    ))
    return 'Expired'

  if(moment
    .utc(item.expired_at, 'YYYY-MM-DD HH-mm:ss Z')
    .isSameOrBefore(
      moment().add(30,'days'),'day'
    ))
    return  'Comming due'

  return  'Current'
}

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
          status           : getStatus(rest),
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
