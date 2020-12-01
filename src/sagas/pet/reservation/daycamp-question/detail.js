
import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import petReservationDaycampQuestionDetailDuck from '@reducers/pet/reservation/dacamp-question/detail'

const { types } = petReservationDaycampQuestionDetailDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const petDaycampQuestions = yield call(Get, '/daycamp-cards/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petDaycampQuestions
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
