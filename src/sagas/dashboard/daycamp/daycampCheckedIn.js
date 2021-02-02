import { call, put, takeEvery } from 'redux-saga/effects'

import daycampDashboardCheckedInDuck  from '@reducers/dashboard/daycamp/daycampCheckedIn'

const { types } = daycampDashboardCheckedInDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { pet: 'Peminta',check_in: '1-29-2021', days_left: '3' , groom: 'No', lunch: 'Yes', addon: 'Yes' },
          { pet: 'Pepprine',check_in: '1-29-2021', days_left: '1' , groom: 'Yes', lunch: 'No', addon: 'No' },
          { pet: 'Jacky',check_in: '1-29-2021', days_left: '1' , groom: 'No', lunch: 'Yes', addon: 'No' }

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
