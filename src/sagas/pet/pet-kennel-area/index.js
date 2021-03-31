import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petKennelAreaDuck from '@reducers/pet/pet-kennel-area'

const { types } = petKennelAreaDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const petKennelAreas = yield call(Get, '/kennel-areas/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petKennelAreas
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
