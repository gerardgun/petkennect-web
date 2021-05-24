import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import orderServiceBoardingKennelTypeDuck from '@reducers/order/service/boarding/kennel/type'

const { selectors, types } = orderServiceBoardingKennelTypeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    // const types = yield call(Get, '/pet-classes/')
    const items = _times(8, index => {
      return {
        id         : index,
        name       : faker.lorem.sentence(3),
        applies    : faker.lorem.sentence(3),
        description: faker.lorem.sentence(6),
        size       : faker.random.arrayElement([ '2x2', '3x3', '4x4', '5x5', '8x4' ]),
        surcharge  : faker.random.boolean(),
        charge_type: faker.random.arrayElement([ 1, 2, 3 ]),
        price      : faker.random.number(30),
        image_url  : faker.image.animals(400, 400)
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items
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
