import { call, put, takeEvery } from 'redux-saga/effects'

import dashboardCalendarStaffingDuck from '@reducers/dashboard/calendar/staffing'

const { types } = dashboardCalendarStaffingDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, name: 'Training Evaluation', time: '8:00am - 10:00pm', assigned: 'Staff Member Name', type: 'training', date: '05 Apr' },
          { id: 2, name: 'Facility Tour', time: '8:00am - 10:00pm', assigned: 'Staff Member Name', type: 'facility', date: '09 Apr' },
          { id: 3, name: 'Day Care Orientation', time: '8:00am - 10:00pm', assigned: 'Staff Member Name', type: 'daycare', date: '12 Apr' },
          { id: 4, name: 'Training Evaluation', time: '8:00am - 10:00pm', assigned: 'Staff Member Name', type: 'training', date: '05 May' },
          { id: 5, name: 'Facility Tour', time: '8:00am - 10:00pm', assigned: 'Staff Member Name', type: 'facility', date: '08 May' }
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
