import { call, put, takeEvery ,select } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petImageDuck from '@reducers/pet/image'

const { types, selectors } = petImageDuck

function* get({ payload : { pet_id } }) {
  try {
    yield put({ type: types.GET_PENDING })

    const { ...filters } = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results,...meta } = yield call(Get, `/pets/${pet_id}/images/`,filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items     : results,
        pagination: {
          ...list.pagination,
          meta
        }
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e,
    })
  }
}

export default [
  takeEvery(types.GET, get)
]
