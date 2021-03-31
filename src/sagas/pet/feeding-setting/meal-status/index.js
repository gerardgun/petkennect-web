
import { call, put, takeEvery } from 'redux-saga/effects'

import mealStatusDuck from '@reducers/pet/feeding-setting/meal-status'

const { types } = mealStatusDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, name: 'All' },
          { id: 1, name: 'None' },
          { id: 2, name: 'Some' },
          { id: 3, name: 'Most' }
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
