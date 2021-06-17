import { call, put, takeEvery } from 'redux-saga/effects'
import companyProfileCalendarDetailDuck from '@reducers/company-profile/calendar/detail'
import { Patch, Post } from '@lib/utils/http-client'

const { types } = companyProfileCalendarDetailDuck

function* post({ payload }) {
  try {
    console.log(payload)
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
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
