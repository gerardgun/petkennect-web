import { call, put, takeEvery } from 'redux-saga/effects'
import faker from 'faker'

import emailLogDuck from '@reducers/email-log'

const { types } = emailLogDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: Array.from({ length: 10 }, index => ({
          id     : index,
          subject: 'Thank you for your interest in No Leash Needed',
          date   : faker.random.arrayElement([ 'Monday , 10/22/2018','Tuesday , 11/22/2019', 'Wednesday , 11/22/2019' ]),
          email  : 'test@gmail.com',
          status : faker.random.arrayElement([ 'Bounced','Delivered','Opened','Clicked' ]),
          action : '#'

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
