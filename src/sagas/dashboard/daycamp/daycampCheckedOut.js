import { call, put, takeEvery } from 'redux-saga/effects'

import daycampDashboardCheckedOutDuck  from '@reducers/dashboard/daycamp/daycampCheckedOut'

const { types } = daycampDashboardCheckedOutDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { pet: 'Henry',hours_in: '4', type: 'Daycamp' , days: 1 },
          { pet: 'Rocky',hours_in: '1', type: 'Daycamp' , days: 1 }

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
