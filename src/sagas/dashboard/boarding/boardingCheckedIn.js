import { call, put, takeEvery } from 'redux-saga/effects'

import boardingDashboardCheckedInDuck  from '@reducers/dashboard/boarding/boardingCheckedIn'

const { types } = boardingDashboardCheckedInDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { pet: 'Tylor',checked_in: '1-29-2021', activity: 'IPP' , meds: 'Yes' },
          { pet: 'Durden',checked_in: '1-19-2021', activity: 'Daycamp' , meds: 'No' },
          { pet: 'jack',checked_in: '1-28-2021', activity: 'IPP' , meds: 'Yes' }

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
