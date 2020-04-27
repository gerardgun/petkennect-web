import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petImageDuck from '@reducers/pet/image'

const { types } = petImageDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const petImages = yield call(Get, '/pet-images/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petImages
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
