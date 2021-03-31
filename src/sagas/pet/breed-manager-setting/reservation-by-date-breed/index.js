import { call, put, takeEvery } from 'redux-saga/effects'

import reservationByDateBreedDuck from '@reducers/pet/breed-manager-setting/reservation-by-date-breed'

const { types } = reservationByDateBreedDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })
    // const filters = yield select(selectors.filters)

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [  { id: 1, breed: 'Shitzy',pet: 'Marilie', owner: 'Alessia Dickinson', date: '3/15/2021', day_services: 5, boarding: 0, grooming: 2, training: 1 },
          { id: 2, breed: 'Rottweiler',pet: 'Karina', owner: 'Alessia Dickinson', date: '3/25/2021', day_services: 3, boarding: 3, grooming: 2, training: 3  },
          { id: 3, breed: 'Shitzy',pet: 'Pepper', owner: 'Diana Zuckerberg', date: '3/15/2021', day_services: 1, boarding: 0, grooming: 1, training: 3  }

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
