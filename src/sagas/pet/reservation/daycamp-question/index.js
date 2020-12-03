import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petReservationDaycampQuestionDuck from '@reducers/pet/reservation/dacamp-question'

const { types } = petReservationDaycampQuestionDuck

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const daycampsCardDetail = yield call(Get, `daycamps/${id.id}/get-details/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: daycampsCardDetail
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
