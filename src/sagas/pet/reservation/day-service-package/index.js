import { call, put, select, takeEvery } from 'redux-saga/effects'

import petServicePackageDuck from '@reducers/pet/reservation/day-service-package'

const { types, selectors } = petServicePackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const list = yield select(selectors.list)

    const meta = {
      current_page: 1,
      from        : 1,
      last_page   : 1,
      links       : { next: null, previous: null },
      page_size   : 5,
      to          : 5,
      total_items : 5 }

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, type: 'Day Camp', allowed: '5', used: '2', remaining: '3', purchased: '03/21/2021', status: 'Active' },
          { id: 2, type: 'Fitness', allowed: '5', used: '3', remaining: '2', purchased: '05/04/2021', status: 'Active' },
          { id: 3, type: 'Dog Walking', allowed: '5', used: '3', remaining: '2', purchased: '03/19/2021', status: 'Used' },
          { id: 4, type: 'Fitness', allowed: '5', used: '2', remaining: '3', purchased: '04/15/2021', status: 'Used' },
          { id: 5, type: 'Dog Walking', allowed: '5', used: '5', remaining: '0', purchased: '05/25/2021', status: 'Used' }
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
