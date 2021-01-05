import { call, put, takeEvery } from 'redux-saga/effects'

import ratingKeyDuck  from '@reducers/rating-key'

const { types } = ratingKeyDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { name: 'Poor',rating_key: 1 },
          { name: 'Below Average',rating_key: 2 },
          { name: 'Average',rating_key: 3 },

          { name: 'Above Average',rating_key: 4 },

          { name: 'Exceptional',rating_key: 5 },

          { name: 'Off Leash',rating_key: 6 }

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
