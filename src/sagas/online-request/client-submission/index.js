import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'

import clientSubmissionDuck from '@reducers/online-request/client-submission'

const { types, selectors } = clientSubmissionDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // const clients = yield call(Get, '/client')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: Array.from({ length: filters.page_size }, index => ({
          id       : index,
          client   : faker.name.firstName(),
          email    : faker.internet.email(),
          mobile   : faker.phone.phoneNumber(),
          location : '02-RH',
          notes    : 'view',
          completed: faker.random.boolean()
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
