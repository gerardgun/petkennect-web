import faker from 'faker'
import { call, put, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import employeeRoleDuck from '@reducers/employee/role'

const { types } = employeeRoleDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // const roles = yield call(Get, '/employee-roles/')
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    const roles = _times(8, index => {
      return {
        id                   : index,
        name                 : faker.random.arrayElement([ 'Groomer', 'Trainer', 'Bather', 'Dog Walker' ]),
        service_name         : faker.random.arrayElement([ 'Grooming', 'Bathing', 'Training', 'Dog Walking' ]),
        applies              : faker.random.arrayElement([ 'All', 'Bath and Brush Large, Bath Brush Small', 'Bathing', 'Training', 'Dog Walking' ]),
        max_scheduled_per_day: faker.random.arrayElement([ 3, 4, 5, 6, 4, 5, 7 ])
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: roles
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
