import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import locationDetailDuck from '@reducers/location/detail'

const { types } = locationDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `locations/${id}/`)

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

    const location = yield call(Get, `locations/${id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: location
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
    const { post_code, ...rest } = payload
    const date = new Date().toDateString()
    const zip_code = yield call(Get, `zips/?search=${post_code}`)

    const employee_schedule = yield call(Post, 'employees-schedules/', {
      name: `Calendar ${payload.name} ${date}`
    })

    yield call(Post, `/employee-schedules/${employee_schedule.id}/events/`, {
      color     : '#000000',
      type      : 'E',
      started_at: new Date(`${date} ${payload.dates[0].start}`).toJSON(),
      ended_at  : new Date(`${date} ${payload.dates[0].end}`).toJSON(),
      frequency : {
        interval_type : 'W',
        interval_value: 1,
        week_days     : [ payload.dates[0].id ]
      }
    })
    yield call(Post, `/employee-schedules/${employee_schedule.id}/events/`, {
      color     : '#000000',
      type      : 'E',
      started_at: new Date(`${date} ${payload.dates[1].start}`).toJSON(),
      ended_at  : new Date(`${date} ${payload.dates[1].end}`).toJSON(),
      frequency : {
        interval_type : 'W',
        interval_value: 1,
        week_days     : [ payload.dates[1].id ]
      }
    })
    yield call(Post, `/employee-schedules/${employee_schedule.id}/events/`, {
      color     : '#000000',
      type      : 'E',
      started_at: new Date(`${date} ${payload.dates[2].start}`).toJSON(),
      ended_at  : new Date(`${date} ${payload.dates[2].end}`).toJSON(),
      frequency : {
        interval_type : 'W',
        interval_value: 1,
        week_days     : [ payload.dates[2].id ]
      }
    })
    yield call(Post, `/employee-schedules/${employee_schedule.id}/events/`, {
      color     : '#000000',
      type      : 'E',
      started_at: new Date(`${date} ${payload.dates[3].start}`).toJSON(),
      ended_at  : new Date(`${date} ${payload.dates[3].end}`).toJSON(),
      frequency : {
        interval_type : 'W',
        interval_value: 1,
        week_days     : [ payload.dates[3].id ]
      }
    })
    yield call(Post, `/employee-schedules/${employee_schedule.id}/events/`, {
      color     : '#000000',
      type      : 'E',
      started_at: new Date(`${date} ${payload.dates[4].start}`).toJSON(),
      ended_at  : new Date(`${date} ${payload.dates[4].end}`).toJSON(),
      frequency : {
        interval_type : 'W',
        interval_value: 1,
        week_days     : [ payload.dates[4].id ]
      }
    })
    yield call(Post, `/employee-schedules/${employee_schedule.id}/events/`, {
      color     : '#000000',
      type      : 'E',
      started_at: new Date(`${date} ${payload.dates[5].start}`).toJSON(),
      ended_at  : new Date(`${date} ${payload.dates[5].end}`).toJSON(),
      frequency : {
        interval_type : 'W',
        interval_value: 1,
        week_days     : [ payload.dates[5].id ]
      }
    })
    yield call(Post, `/employee-schedules/${employee_schedule.id}/events/`, {
      color     : '#000000',
      type      : 'E',
      started_at: new Date(`${date} ${payload.dates[6].start}`).toJSON(),
      ended_at  : new Date(`${date} ${payload.dates[6].end}`).toJSON(),
      frequency : {
        interval_type : 'W',
        interval_value: 1,
        week_days     : [ payload.dates[6].id ]
      }
    })

    const new_location = {
      zip_code         : zip_code[0].id,
      employee_schedule: employee_schedule.id,
      ...rest
    }

    const result = yield call(Post, 'locations/', new_location)

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

    yield call(Patch, `locations/${payload.id}/`, payload)

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
