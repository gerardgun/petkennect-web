import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import authDuck from '@reducers/auth'
import locationDuck from '@reducers/location'

const { types } = locationDuck

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const locations = yield call(Get, '/locations/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: locations
      }
    })

    {/* BEGIN Delete */}
    const authDetail = yield select(authDuck.selectors.detail)

    if(!authDetail.location && locations.length > 0)
      yield put({
        type   : authDuck.types.SET,
        payload: {
          location: locations[0].id
        }
      })
    {/* END Delete */}
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
