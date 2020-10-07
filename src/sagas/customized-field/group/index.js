import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import { sortByProperty } from '@lib/utils/functions'

import customizedFieldGroupDuck from '@reducers/customized-field/group'

const { types } = customizedFieldGroupDuck

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const entitiesGroups = yield call(Get, `eav-entities/${id}/groups/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: entitiesGroups.sort(sortByProperty('order'))
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
