import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petIncidentTypeDuck from '@reducers/pet/incident-type'

const { types } = petIncidentTypeDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const petIncidentTypes = yield call(Get, '/pet-incident-types/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petIncidentTypes
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
