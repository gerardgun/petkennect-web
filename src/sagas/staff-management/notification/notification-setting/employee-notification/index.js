import { call, put, takeEvery } from 'redux-saga/effects'

import employeeNotificationDuck from '@reducers/staff-management/notification/notification-setting/employee-notification'

const { types } = employeeNotificationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, employee_notification: 'Upcoming Shifts', sms: 'false', email: 'false' },
          { id: 2, employee_notification: 'When you have not clocked in for a shift', sms: 'false', email: 'false' },
          { id: 3, employee_notification: 'When you have not clocked out for a shift', sms: 'false', email: 'false' },
          { id: 4, employee_notification: 'When a decision has been made on a request', sms: 'false', email: 'false' },
          { id: 5, employee_notification: 'When there is a new stgaff announcement', sms: 'false', email: 'false' },
          { id: 6, employee_notification: 'When a new schedule is published', sms: 'false', email: 'false' }
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
