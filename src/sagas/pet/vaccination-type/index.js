import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petVaccinationTypeDuck from '@reducers/pet/vaccination-type'

const { types } = petVaccinationTypeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const petVaccinationTypes = yield call(Get, '/pet-vaccination-types/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petVaccinationTypes
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
