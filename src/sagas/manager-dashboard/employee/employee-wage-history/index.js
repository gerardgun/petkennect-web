import { call, put, takeEvery } from 'redux-saga/effects'

import employeeWageHistoryDuck from '@reducers/manager-dashboard/employee/employee-wage-history'

const { types } = employeeWageHistoryDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, role: 'Manager', hourly_rate: '$18.00', salaried: 'Yes', salaried_rate: '$37,440', adjustment_type: 'Merit Increase', start_date: '1/1/2019', end_date: ' ' },
          { id: 2, role: 'Trainer', hourly_rate: '$22.00', salaried: 'No', salaried_rate: '$45,760', adjustment_type: 'Merit Increase', start_date: '1/1/2019', end_date: ' ' },
          { id: 3, role: 'Manager', hourly_rate: '$17.00', salaried: 'Yes', salaried_rate: '$35,360', adjustment_type: 'Promotion', start_date: '1/1/2019', end_date: '12/31/2019' },
          { id: 4, role: 'Supervisor', hourly_rate: '$15.00', salaried: 'No', salaried_rate: '$31,200', adjustment_type: 'Market Adjustment', start_date: '1/1/2018', end_date: '11/31/2019' },
          { id: 5, role: 'Kennel Lead', hourly_rate: '$12.00', salaried: 'No', salaried_rate: '$24,960', adjustment_type: 'Promotion', start_date: '1/1/2020', end_date: '12/31/2020' },
          { id: 6, role: 'Kennel Attendant', hourly_rate: '$20.00', salaried: 'No', salaried_rate: '$41,600', adjustment_type: ' ', start_date: '1/1/2019', end_date: '12/31/2019' }
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
