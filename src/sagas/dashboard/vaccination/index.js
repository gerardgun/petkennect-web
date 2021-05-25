import { put, takeEvery } from 'redux-saga/effects'

import vaccinationDuck from '@reducers/dashboard/vaccination'

const { types } = vaccinationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 1, name: 'Bordetella', expired: true, expired_at: '2021-01-14', notes: 'James Jones', status: true },
          { id: 2, name: 'Rabies' , expired: true,expired_at: '2021-04-11', notes: 'Nicole Barney', status: true },
          { id: 3, name: 'DHLPP' ,expired: true,expired_at: '2021-03-19', notes: 'Nicole Barney', status: true },
          { id: 4, name: 'Negative Fecal' ,expired: false,expired_at: '2021-12-18', notes: '', status: false },
          { id: 5, name: 'Influenza',expired: false, expired_at: '2022-11-24', notes: '', status: false  }

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
