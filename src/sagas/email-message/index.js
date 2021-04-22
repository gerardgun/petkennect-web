import { call, put, select, takeEvery } from 'redux-saga/effects'

import emailMessageDuck from '@reducers/email-message'

const { types, selectors } = emailMessageDuck

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
        items: [ { id: 1, sent: '3-6-2018', from: 'Buddy_Schuster14@hotmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'read' },
          { id: 2, sent: '9-3-2019', from: 'Vince27@hotmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'read' },
          { id: 3, sent: '3-6-2018', from: 'Bryce29@hotmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'read' },
          { id: 4, sent: '4-1-2020', from: 'Norval_Rodriguez@gmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'unread' },
          { id: 5, sent: '9-3-2019', from: 'Adolphus78@hotmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'read' },
          { id: 6, sent: '3-6-2018', from: 'Vince27@hotmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'unread' },
          { id: 7, sent: '9-3-2019', from: 'Buddy_Schuster14@hotmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'unread' },
          { id: 8, sent: '4-1-2020', from: 'Bryce29@hotmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'read' },
          { id: 9, sent: '3-6-2018', from: 'Adolphus78@hotmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'unread' },
          { id: 10, sent: '4-1-2020', from: 'Norval_Rodriguez@gmail.com', subject: 'Thank you for your interest in No Leash Needed', email: 'read' }
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
