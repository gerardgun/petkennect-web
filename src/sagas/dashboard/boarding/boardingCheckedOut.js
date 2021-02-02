import { call, put, takeEvery } from 'redux-saga/effects'

import boardingDashboardCheckedOutDuck  from '@reducers/dashboard/boarding/boardingCheckedOut'

const { types } = boardingDashboardCheckedOutDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { pet: 'Hunter',check_in: '1-27-2021', nights: 2 , charge_card: 'Yes', groom: 'Yes' , by: 'Devika' },
          { pet: 'Noddy',check_in: '1-23-2021', nights: 6 , charge_card: 'No', groom: 'No' , by: 'Devika' }

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
