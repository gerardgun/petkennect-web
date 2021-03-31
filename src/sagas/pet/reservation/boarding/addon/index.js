import { call, put, takeEvery } from 'redux-saga/effects'

import petReservationBoardingAddonDuck from '@reducers/pet/reservation/boarding/add-on'

const { types } = petReservationBoardingAddonDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, boarding_service: 'Pool Time',price: '20.00', description: '20 min service' },
          { id: 1, boarding_service: 'Daily Photos',price: '5.00', description: '5 Photos/Day' },
          { id: 2, boarding_service: 'Individual Play Time',price: '15.00', description: '15 min service' },
          { id: 3, boarding_service: 'Night Time Treat',price: '15.00', description: '2 treats and cuddles' }

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
