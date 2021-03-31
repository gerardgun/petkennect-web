import { call, put, takeEvery } from 'redux-saga/effects'

import dayCareReservationBreedDuck from '@reducers/pet/breed-manager-setting/day-care-reservation-breed'

const { types } = dayCareReservationBreedDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })
    // const filters = yield select(selectors.filters)

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, breed: 'Shitzy',pet: 'Marilie', owner: 'Alessia Dickinson', standing_day_care: 'Yes', past_reservation: 5,future_reservation: 1 },
          { id: 2, breed: 'Rottweiler',pet: 'Karina', owner: 'Alessia Dickinson', standing_day_care: 'Yes', past_reservation: 3,future_reservation: 2  },
          { id: 3, breed: 'Shitzy',pet: 'Pepper', owner: 'Diana Zuckerberg', standing_day_care: 'Yes', past_reservation: 6,future_reservation: 0   }

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
