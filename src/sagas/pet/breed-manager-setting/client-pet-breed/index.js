import { call, put, takeEvery } from 'redux-saga/effects'

import clientPetBreedDuck from '@reducers/pet/breed-manager-setting/client-pet-breed'

const { types } = clientPetBreedDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })
    // const filters = yield select(selectors.filters)

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, breed: 'Shitzy',pet: 'Pepper', owner: 'Diana Zuckerberg', next_reservation: '3/15/2021', last_reservation: '3/23/2021' },
          { id: 2, breed: 'Shitzy',pet: 'Marilie', owner: 'Alessia Dickinson', next_reservation: '4/15/2021' , last_reservation: '2/20/2021'  },
          { id: 3, breed: 'Rottweiler',pet: 'Karina', owner: 'Alessia Dickinson', next_reservation: '3/25/2021' , last_reservation: '2/10/2021' }

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
