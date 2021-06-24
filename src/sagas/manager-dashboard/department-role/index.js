import { call, put, takeEvery } from 'redux-saga/effects'

import departmentRoleDuck from '@reducers/manager-dashboard/department-role'

const { types } = departmentRoleDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, department: 'Customer Service', role: [ 'Trainer', 'Receptionist', 'Supervisor' ], location: [ 'Cold Bay', 'Atka', 'Adak' ] },
          { id: 2, department: 'Training', role: [ 'Assistant Trainer', 'Head Trainer' ], location: [ 'Nilolski', 'Sand Point' ] },
          { id: 3, department: 'Grooming', role: [ 'Groomer' ], location: [ 'Location 1' ] }
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
