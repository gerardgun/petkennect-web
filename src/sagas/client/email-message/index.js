import { call, put, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import clientEmailMessageDuck from '@reducers/client/email-message'

const { types } = clientEmailMessageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(10, index => ({
          id     : index,
          to     : faker.internet.email(),
          from   : faker.internet.email(),
          sent   : '',
          subject: 'Thank you for your interest in No Leash Needed'
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
