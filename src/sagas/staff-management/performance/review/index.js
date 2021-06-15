import { call, put, takeEvery } from 'redux-saga/effects'

import performanceReviewDuck from '@reducers/staff-management/performance/review'

const { types } = performanceReviewDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, period: 'Year End 2020' , date: '01/01/2020' ,manager: 'Deanna Sullivan',status: 'Completed' },
          { id: 2, period: 'Mid Year 2020', date: '01/01/2020' ,manager: 'Deanna Sullivan',status: 'Pending' },
          { id: 3, period: 'Year End 2019' , date: '10/16/2019' ,manager: 'Deanna Sullivan',status: 'Completed' },
          { id: 4, period: 'Mid Year 2019' , date: '09/15/2019' ,manager: 'Deanna Sullivan',status: 'Pending' }

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
