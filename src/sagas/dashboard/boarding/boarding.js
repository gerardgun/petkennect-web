import { call, put, takeEvery } from 'redux-saga/effects'

import boardingDashboardDuck from '@reducers/dashboard/boarding'

const { types } = boardingDashboardDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { pet: 'Julia',check_out: '1-28-2021', activity: 'Daycamp', groom: 'Yes', by: 'Tony',nights: 3, current: 'no' },
          { pet: 'Rambo',check_out: '1-27-2021', activity: 'TLC', groom: 'No', by: 'Devika',nights: 1, current: 'Yes' },
          { pet: 'Goldy',check_out: '1-23-2021', activity: 'Daycamp', groom: 'Yes', by: 'Jhon Edward',nights: 3, current: 'no' }

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
