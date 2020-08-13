import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import employeeDetailDuck from '@reducers/employee/detail'

const { types } = employeeDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `employees/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const employee = yield call(Get, `employees/${id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          ...employee,
          thumbnail_path: employee.thumbnail_path ? `https://petkennect-collection.s3.us-east-2.amazonaws.com/${employee.thumbnail_path}` : null
        }
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const { user_exists, ...values } = payload
    let result

    if(user_exists)
      result = yield call(Post, 'employee-profile/', values)
    else
      result = yield call(Post, 'employees/', values)

    yield put({
      type   : types.POST_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload: { email, ...payload } }) {
  /* eslint no-unused-vars: 0 */ //
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `employees/${payload.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
