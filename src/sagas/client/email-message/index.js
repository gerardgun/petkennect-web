import { call, put, select, takeEvery } from 'redux-saga/effects'

import clientEmailMessageDuck from '@reducers/client/email-message'

const { types, selectors } = clientEmailMessageDuck

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
        items: [ { id: 1, sent: '3-6-2018', status: 'Bounced', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 2, sent: '9-3-2019', status: 'Delivered', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 3, sent: '3-6-2018', status: 'Opened', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 4, sent: '4-1-2020', status: 'Clicked', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 5, sent: '9-3-2019', status: 'Bounced', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 6, sent: '3-6-2018', status: 'Delivered', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 7, sent: '9-3-2019', status: 'Clicked', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 8, sent: '4-1-2020', status: 'Opened', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 9, sent: '3-6-2018', status: 'Bounced', subject: 'Thank you for your interest in No Leash Needed' },
          { id: 10, sent: '4-1-2020', status: 'Delivered', subject: 'Thank you for your interest in No Leash Needed' }
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
