import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petKennelTypeDuck from '@reducers/pet/pet-kennel-type'

const { types } = petKennelTypeDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const petKennelTypes = yield call(Get, '/kennel-types/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petKennelTypes
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
