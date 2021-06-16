import { call, put, takeEvery } from 'redux-saga/effects'

import wagesDuck from '@reducers/staff-management/information/wages'

const { types } = wagesDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, role: 'Manager', rate: '$18.00', type: 'Merit Raise', start_date: '1/1/2019', end_date: '12/31/2019' },
          { id: 2, role: 'Manager', rate: '$15.00', type: '', start_date: '1/1/2020', end_date: '12/31/2020' },
          { id: 3, role: 'Supervisor', rate: '$14.50', type: 'Promotion', start_date: '1/1/2021', end_date: '12/31/2021' }
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
