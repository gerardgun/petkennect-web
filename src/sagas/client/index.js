import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import clientDuck from '@reducers/client'

const { types, selectors } = clientDuck

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
          id: index,
          name: faker.name.firstName(),
          city: faker.address.city(),
          state: faker.address.state(),
          location: '02-RH',
          phone: faker.phone.phoneNumber(),
          home_phone: faker.phone.phoneNumber(),
          current: 'No'
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
