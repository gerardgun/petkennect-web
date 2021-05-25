import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import { Get } from '@lib/utils/http-client'

import servicePriceDuck from '@reducers/service-price'

const { selectors, types } = servicePriceDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const servicePrices = yield call(Get, '/service-price/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: servicePrices.map(({  ...rest }) => ({
          ...rest,
          // Fake data to mockup service capacity section
          location            : faker.random.arrayElement([ 'All', 'Loc1, Loc2' ]),
          max_capacity_per_day: faker.random.arrayElement([ 30, 50, 70, 100 ])
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
