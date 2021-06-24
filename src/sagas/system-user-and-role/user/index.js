import { call, put, takeEvery } from 'redux-saga/effects'

import systemUserDuck from '@reducers/system-user-and-role/user'

const { types } = systemUserDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, name: 'Buffy Summer', status: 'Active', last_login: '1/1/2021 10:00AM', roles: 'Manager', group_access: 'Manager' },
          { id: 2, name: 'Willow Rosenberg', status: 'Terminated', last_login: '1/1/2021 10:00AM', roles: 'Manager, Trainer', group_access: 'Supervisor' },
          { id: 3, name: 'Xander harris', status: 'Active', last_login: '1/1/2021 10:00AM', roles: 'Employee', group_access: 'Customer Service' },
          { id: 4, name: 'Spike Vampire', status: 'Terminated', last_login: '1/1/2021 10:00AM', roles: 'Accounting', group_access: 'Read Only' }
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
