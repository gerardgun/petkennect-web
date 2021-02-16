import { call, put, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import emailTemplateDuck from '@reducers/email-template'

const { types } = emailTemplateDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(10, index => ({
          id        : index,
          purpose   : 'Client Verification',
          subject   : 'Thank you for your interest in No Leash Needed',
          created_by: 'New User Test',
          category  : faker.random.arrayElement([ 'Client', 'Staff' ]),
          is_active : faker.random.boolean()
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
