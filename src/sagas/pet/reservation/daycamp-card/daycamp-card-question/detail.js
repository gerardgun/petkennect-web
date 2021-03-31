import { call, put, select, takeEvery } from 'redux-saga/effects'
import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import daycampCardQuestionDetailDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-question/detail'
import daycampCardQuestionDuck from '@reducers/pet/reservation/daycamp-card/daycamp-card-question'

const { types } = daycampCardQuestionDetailDuck

function* deleteItem() {
  try {
    yield put({ type: types.DELETE_PENDING })
    const daycampCardQuestionDetail = yield select(daycampCardQuestionDetailDuck.selectors.detail)

    yield call(Delete, `daycamp-cards/${daycampCardQuestionDetail.item.card}/questions/${daycampCardQuestionDetail.item.id}/`)
    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ daycamp_card_id, daycamp_card_question_id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const petKennel = yield call(Get, `daycamp-cards/${daycamp_card_id}/questions/${daycamp_card_question_id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: petKennel
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
  const daycampCardQuestion = yield select(daycampCardQuestionDuck.selectors.detail)

  let answerResult
  try {
    yield put({ type: types.POST_PENDING })

    for (let item of daycampCardQuestion.item) {
      let filterData = payload.questions.find(_ => _.id == item.id)
      if(filterData == null)
        yield call(Delete, `daycamp-cards/${item.card}/questions/${item.id}/`)
    }

    for (let _question of payload.questions)
    {
      let questionResult
      if(_question.id)
        questionResult = yield call(Patch, `daycamp-cards/${payload.daycamp_card}/questions/${_question.id}/`, {
          description: _question.description,
          type       : _question.type
        })
      else
        questionResult = yield call(Post, `daycamp-cards/${payload.daycamp_card}/questions/`, {
          description: _question.description,
          type       : _question.type
        })

      for (let item of questionResult.answers) {
        let filterData = _question.answers.find(_ => _.id == item.id)
        if(filterData == null)
          yield call(Delete, `daycamp-card-questions/${questionResult.id}/answers/${item.id}`)
      }

      if(_question.answers)
        for (let _answers of _question.answers)
          if(_answers.id)
            answerResult = yield call(Patch, `daycamp-card-questions/${questionResult.id}/answers/${_answers.id}/`, {
              description: _answers.description
            })
          else
            answerResult = yield call(Post, `daycamp-card-questions/${questionResult.id}/answers/`, {
              description: _answers.description
            })
    }
    yield put({
      type   : types.POST_FULFILLED,
      payload: answerResult
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload }) {
  try {
    yield put({ type: types.PUT_PENDING })

    const result = yield call(Patch, `daycamp-cards/${payload.card}/questions/${payload.id}/`, {
      description: payload.description,
      type       : payload.type
    })

    yield put({
      type   : types.POST_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
