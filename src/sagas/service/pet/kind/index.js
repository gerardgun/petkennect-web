import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import { Get } from '@lib/utils/http-client'

import servicePetKindDuck from '@reducers/service/pet/kind'

const { selectors, types } = servicePetKindDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const servicePetKinds = yield call(Get, '/pet-classes/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: servicePetKinds
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
