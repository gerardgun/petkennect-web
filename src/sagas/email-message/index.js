import { call, put, takeEvery } from 'redux-saga/effects'

import faker from 'faker'
import moment from 'moment'

import emailMessageDuck from '@reducers/email-message'

const { types } = emailMessageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: Array.from({ length: 10 }, index => ({
          id     : index,
          from   : faker.internet.email(),
          subject: 'Thank you for your interest in No Leash Needed',
          sent   : moment(faker.date.past(2)).format('MM-DD-YYYY')
        }))
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
