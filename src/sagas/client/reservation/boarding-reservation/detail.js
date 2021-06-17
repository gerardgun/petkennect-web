import { put, takeEvery } from 'redux-saga/effects'

import boardingReservationDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'

const { types } = boardingReservationDetailDuck

function* create({ payload }) {
  console.log(payload)
  try {
    yield put({ type: types.GET_PENDING })
    yield put({
      payload: {
        form: {
          pet_options: [
            {
              id       : 1,
              image_url: '/images/pets_img/dog_1.jpg',
              name     : 'Pet Name1'
            },
            {
              id       : 2,
              image_url: '/images/pets_img/dog_2.jpg',
              name     : 'Pet Name2'
            }
          ]
        }
      },
      type: types.GET_FULFILLED
    })
  } catch (e) {
    yield put({
      error: e,
      type : types.GET_FAILURE
    })
  }
}

export default [ takeEvery(types.CREATE, create) ]
