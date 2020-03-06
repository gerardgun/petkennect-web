import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _times from 'lodash/times'

import { Get } from '@lib/utils/http-client'

import clientPetDuck from '@reducers/client/pet'

const { types, selectors } = clientPetDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // const pets = yield call(Get, '/client/{}/pet')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: _times(filters.page_size, index => ({
          id: (index + 1),
          name: faker.name.firstName(),
          client_name: faker.name.firstName() + ' ' + faker.name.lastName(),
          breed: faker.random.arrayElement(['Shitzu', 'Yorkshire Terrier', 'Siberian Husky', 'Shitzu X']),
          location: '02-RH',
          current: faker.random.boolean(),
          retired: faker.random.boolean(),
          reason: faker.lorem.words(5),
          day_camp: faker.random.boolean(),
          sex: faker.random.arrayElement(['Male', 'Female']),
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
