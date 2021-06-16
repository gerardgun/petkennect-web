import { call, put, takeEvery } from 'redux-saga/effects'

import employeeNoticeDuck from '@reducers/staff-management/notification/employee-notice'

const { types } = employeeNoticeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, notice_type: 'Performance Review Complete', subject: 'Year End', action: 'Review', bell: 'false', status: 'Completed' },
          { id: 2, notice_type: 'Announcement', subject: 'New Manager', action: 'Review', bell: 'true', status: 'Pending' },
          { id: 3, notice_type: 'Announcement', subject: 'New PTO Policies', action: 'Review', bell: 'true', status: 'Pending' },
          { id: 4, notice_type: 'Performance Award', subject: 'Thank You!', action: 'Review', bell: 'false', status: 'Completed' }
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
