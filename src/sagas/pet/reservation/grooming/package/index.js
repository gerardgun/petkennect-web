import { call, put, takeEvery } from 'redux-saga/effects'

import groomingPackageDuck from '@reducers/pet/reservation/grooming/package'

const { types } = groomingPackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, description: '5 Pack Groom',allowed: '5',used: '3',remaining: '2',purchased: '3/27/2021' ,status: 'Active' },
          { id: 2, description: '10 Pack Groom',allowed: '10',used: '10',remaining: '0',purchased: '3/11/2021' ,status: 'Used' },
          { id: 3, description: '10 Pack Nails',allowed: '10',used: '5',remaining: '5',purchased: '3/19/2021' ,status: 'Active' }

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
