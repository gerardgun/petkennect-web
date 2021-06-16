import { call, put, takeEvery } from 'redux-saga/effects'

import managerNotificationDuck from '@reducers/staff-management/notification/notification-setting/manager-notification'

const { types } = managerNotificationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, manager_notification: 'When staff are running > 10 Min late', sms: 'false', email: 'false' },
          { id: 2, manager_notification: 'When staff have not clecked out of shifts', sms: 'false', email: 'false' },
          { id: 3, manager_notification: 'When a new request is received', sms: 'false', email: 'false' },
          { id: 4, manager_notification: 'Overtime Notifications', sms: 'false', email: 'true' }
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
