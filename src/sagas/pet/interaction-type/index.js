
import { call, put, takeEvery } from 'redux-saga/effects'

import interactionTypeDuck from '@reducers/pet/interaction-type'

const { types } = interactionTypeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, name: 'Feeding' },
          { id: 1, name: 'Walk' },
          { id: 2, name: 'Time Out' },
          { id: 3, name: 'Grooming' }
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
