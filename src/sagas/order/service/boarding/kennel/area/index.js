import faker, { fake } from 'faker'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import orderServiceBoardingKennelAreaDuck from '@reducers/order/service/boarding/kennel/area'

const { selectors, types } = orderServiceBoardingKennelAreaDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // const areas = yield call(Get, '/pet-classes/')
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    const areas = _times(8, index => {
      return {
        id          : index,
        name        : faker.lorem.sentence(3),
        species_name: faker.random.arrayElement([ 'Dog', 'Cat', 'Rabbit', 'Bird' ]),
        applies     : faker.random.arrayElement([ 'Boarding', 'Day Services', 'Training', 'Grooming' ]),
        surcharge   : faker.random.boolean(),
        charge_type : faker.random.arrayElement([ 'No Charge', 'Per Stay', 'Per Night' ]),
        price       : faker.random.number(30)
      }
    })

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
