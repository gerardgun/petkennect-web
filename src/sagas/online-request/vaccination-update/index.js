import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import vaccinationUpdateDuck from '@reducers/online-request/vaccination-update'

const { types, selectors } = vaccinationUpdateDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // const clients = yield call(Get, '/client')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(filters.page_size, index => ({
          id              : index,
          client          : faker.name.firstName(),
          pet             : faker.name.lastName(),
          vaccination_type: faker.name.title(),
          ready           : faker.random.boolean()
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
