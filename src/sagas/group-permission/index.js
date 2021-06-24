import { call, put, takeEvery } from 'redux-saga/effects'

import groupPermissionDuck from '@reducers/group-permission'

const { types } = groupPermissionDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [
          { id: 1, permission: 'Add/Edit Animal Settings', admin: true, manager: true, supervisor: false, customer_service: false, read_only: false },
          { id: 2, permission: 'Add/Edit Company Profile', admin: true, manager: false, supervisor: false, customer_service: false, read_only: false },
          { id: 3, permission: 'Add/Edit Service Settings', admin: true, manager: true, supervisor: false, customer_service: false, read_only: false },
          { id: 4, permission: 'Add/Edit Application Settings', admin: true, manager: true, supervisor: false, customer_service: false, read_only: false },
          { id: 5, permission: 'Add/Edit Financial Settings', admin: true, manager: true, supervisor: false, customer_service: false, read_only: false },
          { id: 6, permission: 'Add/Edit User Settings', admin: true, manager: true, supervisor: false, customer_service: false, read_only: false },
          { id: 7, permission: 'Add/Edit Pricing Items', admin: true, manager: true, supervisor: true, customer_service: false, read_only: false },
          { id: 8, permission: 'Edit Closed Invoices', admin: true, manager: true, supervisor: true, customer_service: false, read_only: false },
          { id: 9, permission: 'Process Refunds', admin: true, manager: true, supervisor: true, customer_service: true, read_only: false },
          { id: 10, permission: 'Read Only Access', admin: false, manager: false, supervisor: false, customer_service: false, read_only: true },
          { id: 11, permission: 'Udo Check In', admin: true, manager: true, supervisor: true, customer_service: true, read_only: false }
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
