import { call, put, takeEvery } from 'redux-saga/effects'

import dayCampDashboardDuck from '@reducers/dashboard/daycamp'

const { types } = dayCampDashboardDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { pet: 'Pablo',daycamp: 'Yes', groom: 'No', current: 'Yes', addon: 'No' },
          { pet: 'Jerin',daycamp: 'Yes', groom: 'Yes', current: 'No', addon: 'Yes' },
          { pet: 'Ruby',daycamp: 'Yes', groom: 'No', current: 'Yes', addon: 'Yes' },
          { pet: 'Laica',daycamp: 'Yes', groom: 'Yes', current: 'Yes', addon: 'No' }

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
