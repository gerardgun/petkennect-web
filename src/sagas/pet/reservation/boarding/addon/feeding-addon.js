import { call, put, takeEvery } from 'redux-saga/effects'

import petFeedingAddonDuck from '@reducers/pet/reservation/boarding/add-on/feeding-addon'

const { types } = petFeedingAddonDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, feeding_service: ' Additional Feed',price: '20' },
          { id: 2, feeding_service: 'Feed In Kennel Food',price: '15' },
          { id: 3, feeding_service: 'Feed In Kennel Wet',price: '15' }

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
