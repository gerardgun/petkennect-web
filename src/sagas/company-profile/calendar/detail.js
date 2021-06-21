import { call, put, takeEvery } from 'redux-saga/effects'
import companyProfileCalendarDetailDuck from '@reducers/company-profile/calendar/detail'
import { Get, Patch, Post } from '@lib/utils/http-client'

const { types } = companyProfileCalendarDetailDuck

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const result = yield call(Get, `employees-schedules/${id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: result
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

    const result = yield call(Post, 'employees-schedules/', payload)

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

function* _put({ payload }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `employees-schedules/${payload.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
