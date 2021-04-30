import faker from 'faker'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import serviceGroupPetKindDuck from '@reducers/service/group/pet/kind'

const { selectors, types } = serviceGroupPetKindDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    // const serviceGroupPetKinds = yield call(Get, '/pet-classes/', filters)
    const serviceGroupPetKinds = _times(5, index => {
      return {
        id                  : index,
        species_name        : faker.random.arrayElement([ 'Dog', 'Cat', 'Bird' ]),
        service_group_name  : faker.random.arrayElement([ 'Grooming', 'Boarding', 'Training', 'Day Services' ]),
        max_capacity_per_day: faker.random.arrayElement([ 10, 15, 30, 35, 50, 70, 100 ])
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: serviceGroupPetKinds
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
