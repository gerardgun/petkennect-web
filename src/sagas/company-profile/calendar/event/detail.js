import { Patch, Post, Delete } from '@lib/utils/http-client'
import companyProfileCalendarEventDetailDuck from '@reducers/company-profile/calendar/event/detail'
import { call, put, takeEvery } from 'redux-saga/effects'
import moment from 'moment'

const { types } = companyProfileCalendarEventDetailDuck

function* post({ payload }) {
  try {
    let started_at = moment(payload.start_date).utc().format()
    let ended_at = moment(payload.end_date).utc().format()
    if(!payload.is_all_day) {
      started_at = moment(`${payload.start_date} ${payload.start_time}`)
        .utc()
        .format()
      ended_at = moment(`${payload.end_date} ${payload.end_time}`)
        .utc()
        .format()
    }
    yield put({ type: types.POST_PENDING })
    if(!payload.is_recurring) delete payload.frequency
    else
      payload = {
        ...payload,
        frequency: {
          ...payload.frequency,
          interval_value: payload.interval_value
        }
      }
    const result = yield call(
      Post,
      `employee-schedules/${payload.calendarId}/events/`,
      {
        ...payload,
        started_at,
        ended_at
      }
    )

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
    let started_at = moment(payload.start_date).utc().format()
    let ended_at = moment(payload.end_date).utc().format()
    if(!payload.is_all_day) {
      started_at = moment(`${payload.start_date} ${payload.start_time}`)
        .utc()
        .format()
      ended_at = moment(`${payload.end_date} ${payload.end_time}`)
        .utc()
        .format()
    }

    yield put({ type: types.PUT_PENDING })

    if(!payload.is_recurring) {delete payload.frequency}
    else {
      let frequencyFormatted = {
        interval_value: payload.interval_value,
        interval_type : payload.frequency.interval_type,
        week_days     : payload.frequency.week_days
      }
      if(payload.frequency.ended_at)
        frequencyFormatted = {
          ...frequencyFormatted,
          ended_at: payload.frequency.ended_at
        }
      payload = {
        ...payload,
        frequency: frequencyFormatted
      }
    }
    /*
    let frequencyFormatted = {
      interval_value: payload.is_recurring ? payload.frequency.interval_value : null,
      interval_type : payload.is_recurring ? payload.frequency.interval_type : null,
      week_days     : payload.is_recurring ? payload.frequency.week_days : null
    }
    if(payload.frequency.ended_at)
      frequencyFormatted = {
        ...frequencyFormatted,
        ended_at: payload.frequency.ended_at
      }

    payload = {
      ...payload,
      frequency: frequencyFormatted
    }
    */
    yield call(
      Patch,
      `employee-schedules/${payload.calendarId}/events/${payload.id}`,
      {
        ...payload,
        started_at,
        ended_at
      }
    )
    yield put({
      type: types.PUT_FULFILLED
    })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* _delete({ payload }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(
      Delete,
      `employee-schedules/${payload.calendarId}/events/${payload.id}`
    )

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.DELETE, _delete)
]
