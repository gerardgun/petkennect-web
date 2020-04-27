import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import locationDuck from '@reducers/location'

const { types } = locationDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const locations = yield call(Get, '/locations/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: locations
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
