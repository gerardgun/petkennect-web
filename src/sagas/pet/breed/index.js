import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petBreedDuck from '@reducers/pet/breed'

const { types } = petBreedDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const petBreeds = yield call(Get, '/pet-breeds/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petBreeds
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
