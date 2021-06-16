import { call, put, takeEvery } from 'redux-saga/effects'

import performanceNotesDuck from '@reducers/staff-management/performance/notice'

const { types } = performanceNotesDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, notice: 'Performance Award' , date: '01/01/2021' ,manager: 'Deanna Sullivan',status: 'Completed' },
          { id: 2, notice: 'Performance Warning', date: '01/01/2021' ,manager: 'Deanna Sullivan',status: 'Completed' },
          { id: 3, notice: 'Formal Write Up' , date: '10/16/2019' ,manager: 'Deanna Sullivan',status: 'Completed' },
          { id: 4, notice: 'Verbal Warning' , date: '09/15/2018' ,manager: 'Deanna Sullivan',status: 'Completed' }

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
