import { call, put, takeEvery } from 'redux-saga/effects'

import employeeDirectoryDuck from '@reducers/manager-dashboard/employee/employee-directory'

const { types } = employeeDirectoryDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, name: 'Buffy Summer', designation: 'General Manager', location: '123233', status: 'Active', department: 'Management', role: 'General Manager', phone: '(999)233-6892' },
          { id: 2, name: 'Willow Rosenberg', designation: 'Manager', location: '453553', status: 'Active', department: 'Customer Service', role: 'Assistant Manager', phone: '(879)444-2362' },
          { id: 3, name: 'Xander harris', designation: 'Employee', location: '444242', status: 'Active', department: 'Grooming', role: 'Groomer', phone: '(468)233-6892' },
          { id: 4, name: 'Spike Vampire', designation: 'Admin', location: '646444', status: 'Active', department: 'Management', role: 'General Manager', phone: '(315)233-6892' }
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
