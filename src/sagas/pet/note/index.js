import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import noteDuck from '@reducers/pet/note'

const { types, selectors } = noteDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const { pet_id, ...filters } = yield select(selectors.filters)
    const results = yield call(Get, `/pets/${pet_id}/notes/`,filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(({ employee_first_name = '-', employee_last_name = '', ...rest })=> ({
          employee_fullname: `${employee_first_name} ${employee_last_name}`,
          ...rest
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

export default [
  takeEvery(types.GET, get)
]
