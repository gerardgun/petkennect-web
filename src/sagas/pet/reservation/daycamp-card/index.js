import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import daycampCardDuck from '@reducers/pet/reservation/daycamp-card'

const { types } = daycampCardDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const daycampCards = yield call(Get, 'daycamp-cards/')
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: daycampCards
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
