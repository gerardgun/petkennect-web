import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Delete, Post, Patch } from '@lib/utils/http-client'

import daycampCardAnswerDetailDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-answer/detail'

const { types } = daycampCardAnswerDetailDuck

function* deleteItem() {
  try {
    yield put({ type: types.DELETE_PENDING })
    const daycampCardAnswerDetail = yield select(daycampCardAnswerDetailDuck.selectors.detail)

    yield call(Delete, `daycamp-card-questions/${daycampCardAnswerDetail.item.questionId}/answers/${daycampCardAnswerDetail.item.id}`)
    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* post({ payload: { daycamp_card_question_id, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `daycamp-card-questions/${daycamp_card_question_id}/answers/`, payload)

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

function* _put({ payload: { daycamp_card_question_id, daycamp_card_answer_id, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `daycamp-card-questions/${daycamp_card_question_id}/answers/${daycamp_card_answer_id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
