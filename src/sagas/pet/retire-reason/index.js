import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petRetireReasonDuck from '@reducers/pet/retire-reason'

const { types } = petRetireReasonDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const petRetireReasons = yield call(Get, '/pet-retire-reasons/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petRetireReasons
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
