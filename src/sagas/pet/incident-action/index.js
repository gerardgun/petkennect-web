import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petIncidentActionDuck from '@reducers/pet/incident-action'

const { types } = petIncidentActionDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const petIncidentActions = yield call(Get, '/pet-incident-actions/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: petIncidentActions
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
