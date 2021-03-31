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
        items: [ { name: 'Poor',rating_key: 1, description: 'Dog is not performing commands' },
          { name: 'Below Average',rating_key: 2, description: 'Dog performs command sometimes' },
          { name: 'Average',rating_key: 3, description: 'Dog performs commands but cannot hold command' },

          { name: 'Above Average',rating_key: 4, description: 'Dog is holding commands most of the time' },

          { name: 'Exceptional',rating_key: 5 , description: 'Dog is performing and holding commands all the time' },

          { name: 'Off Leash',rating_key: 6, description: 'Dog performs all command off-leash reliably' }

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
