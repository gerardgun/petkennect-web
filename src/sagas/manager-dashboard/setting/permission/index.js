import { call, put, takeEvery } from 'redux-saga/effects'

import settingPermissionDuck from '@reducers/manager-dashboard/setting/permission'

const { types } = settingPermissionDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, permission: 'Upgrade/Downgrade Account', admin: true, manager: false, supervisor: false, employee: false },
          { id: 2, permission: 'View Employee Wages', admin: true, manager: true, supervisor: false, employee: false },
          { id: 3, permission: 'Prevent managers from viewing equivalent managers wages', admin: true, manager: true, supervisor: false, employee: false },
          { id: 4, permission: 'View Labor Reports', admin: true, manager: true, supervisor: false, employee: false },
          { id: 5, permission: 'Add/Edit Departments and Roles', admin: true, manager: true, supervisor: false, employee: false },
          { id: 6, permission: 'Approve availability Requests', admin: true, manager: true, supervisor: true, employee: false },
          { id: 7, permission: 'Edit Permission Access Levels', admin: true, manager: false, supervisor: false, employee: false },
          { id: 8, permission: 'View sensitive Employee Documents(Tax Forms etc)', admin: true, manager: true, supervisor: false, employee: false },
          { id: 9, permission: 'Access to View/Add/Edit Employee Data', admin: true, manager: true, supervisor: true, employee: false },
          { id: 10, permission: 'Who can view, edit, or terminte employees?', admin: false, manager: false, supervisor: true, employee: false },
          { id: 11, permission: 'Access to Manager Loop', admin: true, manager: true, supervisor: false, employee: false }
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
