import { call, put, takeEvery } from 'redux-saga/effects'

import trainingReservationGroupClassDuck from '@reducers/pet/reservation/training/reservation/group-class'

const { types } = trainingReservationGroupClassDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, class_name: 'Group 1', start_date: '2021-2-18', time: '7:00 PM', frequency: 'Every Monday for 6 Weeks', ends: '2021-03-25', trainer: 'James',price: '$50.00'  },
          { id: 2, class_name: 'Agility 1', start_date: '2021-2-10', time: '8:15 PM', frequency: 'Every Tuesday for 4 Weeks', ends: '2021-03-16', trainer: 'Andrew',price: '$50.00'  },
          { id: 3, class_name: 'Puppy 1', start_date: '2021-2-15', time: '10:00 AM', frequency: 'Every Sunday for 6 Weeks', ends: '2021-03-18', trainer: 'Briant',price: '$50.00'  },
          { id: 4, class_name: 'Group 2', start_date: '2021-2-12', time: '7:00 PM', frequency: 'Every Monday for 6 Weeks', ends: '2021-03-20', trainer: 'Mack',price: '$50.00'  }

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
