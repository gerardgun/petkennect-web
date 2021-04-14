
import { call, put, takeEvery } from 'redux-saga/effects'

import medicationUnitDuck from '@reducers/pet/medication-setting/medication-unit'

const { types } = medicationUnitDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, name: 'Pill' },
          { id: 2, name: 'Drop' },
          { id: 3, name: 'CCs' },
          { id: 4, name: 'MLs' }
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

