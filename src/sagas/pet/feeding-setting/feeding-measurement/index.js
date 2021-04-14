
import { call, put, takeEvery } from 'redux-saga/effects'

import feedingMeasurementDuck from '@reducers/pet/feeding-setting/feeding-measurement'

const { types } = feedingMeasurementDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, name: '1' },
          { id: 2, name: '1/2' },
          { id: 3, name: '1/3' },
          { id: 4, name: '1/4' },
          { id: 5, name: '2' },
          { id: 6, name: '3' },
          { id: 7, name: '4' },
          { id: 8, name: '5' }
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
