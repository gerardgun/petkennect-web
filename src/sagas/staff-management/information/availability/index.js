import { call, put, takeEvery } from 'redux-saga/effects'

import availabilityDuck from '@reducers/staff-management/information/availability'

const { types } = availabilityDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, day: 'Monday', from: '07:00', to: '18:00', anytime: false, unavailable: false },
          { id: 2, day: 'Tuesday', from: '10:00', to: '17:00', anytime: false, unavailable: false },
          { id: 3, day: 'Wednesday', from: '08:00', to: '19:00', anytime: false, unavailable: false },
          { id: 4, day: 'Thursday', from: '11:00', to: '16:00', anytime: true, unavailable: false },
          { id: 5, day: 'Friday', from: '09:00', to: '15:00', anytime: true, unavailable: false },
          { id: 6, day: 'Saturday', from: '10:00', to: '18:00', anytime: false, unavailable: true },
          { id: 7, day: 'Sunday', from: '09:00', to: '17:00', anytime: false, unavailable: true }
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
