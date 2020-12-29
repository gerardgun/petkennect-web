import { call, put, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import packagePricingDuck  from '@reducers/package-pricing'

const { types } = packagePricingDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(10, index => ({
          id          : index,
          program     : faker.random.arrayElement([ 'Boarding','DayCamp','Grooming','Retail','Training' ]),
          sub_category: faker.random.arrayElement([ 'Boarding','Toys','Fitness','peak','food', 'Service','Collars', 'Misc' ]),
          package_name: faker.random.arrayElement([ 'Board & Train (3 Week)','Bronze - IPP', 'Brushing','Day Training - 4 Weeks','Fit 10-Pack','Food Charge','Half Day','Nails - Trim' ]),
          type        : faker.random.arrayElement([ 'Service','Retail' ]),
          price       : faker.random.arrayElement([ 995,699,179,124.65,459 ]),
          status      : faker.random.boolean(),
          contract    : faker.random.arrayElement([ 'yes','No' ]),
          of_days     : faker.random.arrayElement([ 10,20,30,45 ]),
          discription : faker.random.arrayElement([ 'good program for dogs' ]),
          sort        : faker.random.arrayElement([ 1,2,3,4 ])

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
