import { call, put, takeEvery } from 'redux-saga/effects'

import boardingPackageDuck from '@reducers/pet/reservation/boarding/package'

const { types } = boardingPackageDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, description: '5 Night Package',allowed: '5',used: '3',remaining: '2',purchased: '3/27/2021' ,status: 'Active' },
          { id: 2, description: '10 Night Package',allowed: '10',used: '10',remaining: '0',purchased: '3/18/2021' ,status: 'Used' }

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
