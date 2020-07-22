import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petKindDuck from '@reducers/pet/kind'

const { types } = petKindDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const petKinds = yield call(Get, '/pet-classes/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petKinds
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
