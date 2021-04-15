
import { call, put, takeEvery } from 'redux-saga/effects'

import feedingUnitDuck from '@reducers/pet/feeding-setting/feeding-unit'

const { types } = feedingUnitDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, name: 'Cup' },
          { id: 2, name: 'Tablespoon' },
          { id: 3, name: 'Teaspoon' },
          { id: 4, name: 'Prepackaged Bag' }
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
