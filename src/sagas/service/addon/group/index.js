/** for  future use, currently unused*/
import { /* call,*/ put, select, takeEvery } from 'redux-saga/effects'

import serviceAddonGroupDuck from '@reducers/service/addon/group'

const { selectors, types } = serviceAddonGroupDuck

function* get(/* { payload }*/) {
  try {
    yield put({ type: types.GET_PENDING })

    const list = yield select(selectors.list)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: list
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
