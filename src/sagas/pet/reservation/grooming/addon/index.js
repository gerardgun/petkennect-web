import { call, put, takeEvery } from 'redux-saga/effects'

import groomingReservationAddonDuck from '@reducers/pet/reservation/grooming/add-on'

const { types } = groomingReservationAddonDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, addon: 'Anal Gland Expression', price: '12.00', discription: 'Anal gland expression'  },
          { id: 1, addon: 'Brush out-first 15 minutes', price: '15.00', discription: 'Standard brush out to remove loose hair.Takes no more than 15 minutes.' },
          { id: 2, addon: 'Brush out additional time $1 per minute', price: '1.00', discription: 'Brush out up charge -$1 per minute additional beyond first 15 minutes' },
          { id: 3, addon: 'Ear Cleaning', price: '12.00', discription: 'Clean ears - not medical for maintenance/hygeine only.' },
          { id: 4, addon: 'Ears, Nails & Anal Expression', price: '20.00', discription: 'Ears, Nails & Anals' }
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
