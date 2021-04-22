import { call, put, select, takeEvery } from 'redux-saga/effects'

import emailLogDuck from '@reducers/email-log'

const { types, selectors } = emailLogDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const list = yield select(selectors.list)
    const meta = {
      current_page: 1,
      from        : 1,
      last_page   : 1,
      links       : { next: null, previous: null },
      page_size   : 10,
      to          : 10,
      total_items : 10 }

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, date: 'Monday , 10/22/2018', email: 'test@gmail.com', status: 'Bounced', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 2, date: 'Tuesday , 11/22/2019', email: 'test@gmail.com', status: 'Delivered', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 3, date: 'Monday , 10/22/2018', email: 'test@gmail.com', status: 'Opened', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 4, date: 'Wednesday , 11/22/2019', email: 'test@gmail.com', status: 'Clicked', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 5, date: 'Wednesday , 11/22/2019', email: 'test@gmail.com', status: 'Bounced', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 6, date: 'Tuesday , 11/22/2019', email: 'test@gmail.com', status: 'Delivered', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 7, date: 'Monday , 10/22/2018', email: 'test@gmail.com', status: 'Clicked', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 8, date: 'Tuesday , 11/22/2019', email: 'test@gmail.com', status: 'Opened', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 9, date: 'Wednesday , 11/22/2019', email: 'test@gmail.com', status: 'Bounced', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 10, date: 'Monday , 10/22/2018', email: 'test@gmail.com', status: 'Delivered', subject: 'Thank you for your interest in No Leash Needed' }
        ],
        pagination: {
          ...list.pagination,
          meta
        }
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
