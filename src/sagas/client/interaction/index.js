import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import clientInteractionDuck from '@reducers/client/interaction'

const { types, selectors } = clientInteractionDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // const clients = yield call(Get, '/client')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(filters.page_size, index => ({
          id: (index + 1),
          date: faker.date.past().toISOString().split('T')[0],
          staff_id: 1,
          staff: faker.name.firstName() + ' ' + faker.name.lastName(),
          location_id: 1,
          location: '02-RH',
          comment: faker.lorem.paragraph(),
          follow_up: faker.random.boolean(),
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
