import { call, put, takeEvery } from 'redux-saga/effects'

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
        items: Array.from({ length: 10 }, index => ({
          id     : index,
          to     : faker.internet.email(),
          from   : faker.internet.email(),
          sent   : faker.random.arrayElement([ '3-6-2018', '9-3-2019','24-10-2020' ]),
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
