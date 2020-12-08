import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import daycampCardQuestionDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-question'

const { types } = daycampCardQuestionDuck

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const daycampCardQuestions = yield call(Get, `/daycamp-cards/${id}/questions/`)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: daycampCardQuestions
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
