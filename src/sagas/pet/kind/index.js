import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import { Get } from '@lib/utils/http-client'

import petKindDuck from '@reducers/pet/kind'

const { selectors, types } = petKindDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    const filters = yield select(selectors.filters)
    const petKinds = yield call(Get, '/pet-classes/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petKinds.map(({  ...rest }) => ({
          ...rest,
          location: faker.random.arrayElement([ 'All', 'Loc1, Loc2' ])
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
