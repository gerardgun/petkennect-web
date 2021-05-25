import { call, put, takeEvery } from 'redux-saga/effects'

import notificationDuck from '@reducers/dashboard/notification'

const { types } = notificationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, name: 'Devika Christie', notification: 'submitted vaccinations', request: 'Submission', type: 'vaccination', date: '05/12/2021' },
          { id: 2, name: 'Deanna Sullivan', notification: 'sent in a Boarding Request',  request: 'Request', type: 'request', date: '05/12/2021' },
          { id: 3, name: 'Devika Christie', notification: 'cancelled a reservation',  request: 'Cancellation', type: 'cancel', date: '05/12/2021' },
          { id: 4, name: 'Guillermo Espinosa', notification: 'sent a Day Care Request',  request: 'Request', type: 'request', date: '05/12/2021' },
          { id: 5, name: 'New Client', notification: 'submitted information',  request: 'Submission', type: 'information', date: '05/12/2021' },
          { id: 6, name: 'Deanna Sullivan', notification: 'sent in a Boarding Request',  request: 'Request', type: 'request', date: '05/12/2021' }
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
