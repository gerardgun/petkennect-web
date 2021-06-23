import { call, put, takeEvery } from 'redux-saga/effects'

import systemRoleDuck from '@reducers/system-user-and-role/role'

const { types } = systemRoleDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, role: 'Groomer' },
          { id: 2, role: 'Trainer' }
        ]
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
