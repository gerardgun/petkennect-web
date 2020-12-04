
import { call, put, takeEvery } from 'redux-saga/effects'

import { Get, Post } from '@lib/utils/http-client'
import petReservationDaycampQuestionDetailDuck from '@reducers/pet/reservation/dacamp-question/detail'

const { types } = petReservationDaycampQuestionDetailDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const petDaycampQuestions = yield call(Get, '/daycamp-cards/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petDaycampQuestions.find(_ => _.is_active == true)
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `daycamps/${payload.id}/add-details/`, payload.details)

    yield put({
      type   : types.POST_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Post, `daycamps/${payload.id}/update-details/`, payload.details)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
