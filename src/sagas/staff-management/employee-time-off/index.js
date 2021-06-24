import { call, put, takeEvery } from 'redux-saga/effects'

import employeeTimeOffDuck from '@reducers/staff-management/employee-time-off'

const { types } = employeeTimeOffDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, leave_type: 'PTO', start_date: '06/01/2021',end_date: '06/07/2021',status: 'Approved' },
          { id: 2, leave_type: 'PTO', start_date: '07/01/2021',end_date: '07/05/2021',status: 'Not Approved' },
          { id: 3, leave_type: 'PTO', start_date: '08/01/2021',end_date: '8/10/2021',status: 'Pending' }

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
