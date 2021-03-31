import { call, put, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import { Get } from '@lib/utils/http-client'

import petIncidentTypeDuck from '@reducers/pet/incident-type'

const { types } = petIncidentTypeDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    // const filters = yield select(selectors.filters)
    const petIncidentTypes = yield call(Get, '/pet-incident-types/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petIncidentTypes.map(({  ...rest }) => ({
          ...rest,
          groupLimit: faker.random.arrayElement([ '0(default Value)', '3' ]),
          allLimit  : faker.random.arrayElement([ '0(default Value)', '5' ])
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
