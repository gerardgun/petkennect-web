import { call, put, takeEvery } from 'redux-saga/effects'

import veterinarianListDuck from '@reducers/pet/veterinarian-list'

const { types } = veterinarianListDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, name: 'James' },
          { id: 1, name: 'Hydra' },
          { id: 2, name: 'Manik' }
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
