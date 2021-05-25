import { call, put, takeEvery } from 'redux-saga/effects'

import tasklistDuck from '@reducers/dashboard/tasklist'

const { types } = tasklistDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, task: 'Send the Billing Agreement', priority: 'High', date: '05/12/2021' },
          { id: 2, task: 'Send over all the documentation', priority: 'null', date: '05/12/2021' },
          { id: 3, task: 'Call Adam to review the theme documentation', priority: 'Low', date: '05/12/2021' },
          { id: 4, task: 'Meeting with Daron to review the intake form', priority: 'High', date: '05/12/2021' },
          { id: 5, task: 'Check uiKings theme and give customer support', priority: 'Medium', date: '05/12/2021' }
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
