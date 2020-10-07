import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import { sortByProperty } from '@lib/utils/functions'

import customizedFieldDuck from '@reducers/customized-field/field'

const { types } = customizedFieldDuck

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const entitiesAttributes = yield call(Get, `eav-entities/${id}/attributes/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: entitiesAttributes.sort(sortByProperty('order'))
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
