
import { call, put, takeEvery } from 'redux-saga/effects'

import feedingMethodDuck from '@reducers/pet/feeding-setting/feeding-method'

const { types } = feedingMethodDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, name: 'Seperate to Feed' },
          { id: 1, name: 'Feed Alone' },
          { id: 2, name: 'Use Slow Feeder' },
          { id: 3, name: 'Monitor Feeding' }
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
