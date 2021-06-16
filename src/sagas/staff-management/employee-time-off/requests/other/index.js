import { call, put, takeEvery } from 'redux-saga/effects'

import employeeTimeOffOtherDuck from '@reducers/staff-management/employee-time-off/requests/other'

const { types } = employeeTimeOffOtherDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1,type: 'Schedule Change' ,data_submitted: 'PTO' ,status: 'Approved' },
          { id: 2, type: 'Mentor Program', data_submitted: 'PTO',status: 'Declined' }

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
