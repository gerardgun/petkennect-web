import { call, put, takeEvery } from 'redux-saga/effects'
// import _times from 'lodash/times'
// import faker from 'faker'

import dayCampReservationUsageDuck from '@reducers/pet/reservation/usage/daycamp/reservation'

const {  types } = dayCampReservationUsageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)

    yield call(() => new Promise(resolve => setTimeout(resolve, 1000)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1 , service_name: 'DayCamp',past: '20', upcoming: '5', canceled: '0' },
          { id: 2 , service_name: 'DayCamp',past: '10', upcoming: '3', canceled: '0' },
          { id: 3 , service_name: 'DayCamp',past: '19', upcoming: '9', canceled: '0' }

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
