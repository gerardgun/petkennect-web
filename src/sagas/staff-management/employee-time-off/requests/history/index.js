import { call, put, takeEvery } from 'redux-saga/effects'

import employeeTimeOffHistoryDuck from '@reducers/staff-management/employee-time-off/requests/history'

const { types } = employeeTimeOffHistoryDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, date: '01/01/2021 - 01/25/2021', policy: 'PTO',total_time: '4 Days(32 Hours)',status: 'Approved' },
          { id: 2, date: '01/01/2021 - 01/25/2021', policy: 'Unpaid Time Off',total_time: '4 Days(32 Hours)',status: 'Declined' }

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
