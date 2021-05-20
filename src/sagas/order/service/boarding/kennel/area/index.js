import faker from 'faker'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import kennelAreaDuck from '@reducers/order/service/boarding/kennel/area'

const { selectors, types } = kennelAreaDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const results = yield call(Get, '/orders-services-boardings-kennels-areas/', filters)

    const areas = results.map(item => ({
      ...item,
      applies    : faker.random.arrayElement([ 'Boarding', 'Day Services', 'Training', 'Grooming' ]),
      surcharge  : faker.random.boolean(),
      charge_type: faker.random.arrayElement([ 1, 2, 3 ]),
      price      : faker.random.number(30),
      capacity   : faker.random.number(10)
    }))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: areas
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
