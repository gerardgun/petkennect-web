import { Get } from '@lib/utils/http-client'
import companyProfileCalendarEventDuck from '@reducers/company-profile/calendar/event'
import { call, put, takeEvery } from 'redux-saga/effects'
import moment from 'moment'
const { types } = companyProfileCalendarEventDuck

const INTERVAL_TYPES = {
  Y: 'yearly',
  M: 'monthly',
  W: 'weekly',
  D: 'daily'
}

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const result = yield call(
      Get,
      `employee-schedules/${payload.calendarId}/events`
    )

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: result.map((event) => {
          const data = {
            ...event,
            is_recurring: false,
            title       : event.name,
            allDay      : event.is_all_day,
            start       : moment(event.started_at, 'YYYY-MM-DD[T]HH:mm:ssZ').format(
              'YYYY-MM-DD HH:mm'
            ),
            end: event.is_all_day
              ? moment(event.ended_at, 'YYYY-MM-DD[T]HH:mm:ssZ')
                .hours(24)
                .format('YYYY-MM-DD HH:mm')
              : moment(event.ended_at, 'YYYY-MM-DD[T]HH:mm:ssZ').format(
                'YYYY-MM-DD HH:mm'
              )
          }
          if(data.frequency.interval_value) {
            const { frequency } = data
            const hours = moment(data.end).diff(
              moment(data.start),
              'hours',
              true
            )
            const minutes = Math.floor(60 * (hours % 1))

            const newData = {
              ...data,
              is_recurring: true,
              duration    : `${Math.floor(hours / 1)}:${
                minutes > 9 ? minutes : `0${minutes}`
              }`,
              rrule: {
                dtstart : data.start,
                interval: frequency.interval_value,
                freq    : INTERVAL_TYPES[frequency.interval_type],
                until   : frequency.ended_at
              }
            }
            if(frequency.week_days.length > 0)
              return {
                ...newData,
                rrule: {
                  ...newData.rrule,
                  byweekday: event.frequency.week_days.map(day => day - 1)
                }
              }

            return newData
          }
          else {
            delete data.frequency
          }

          return data
        })
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

export default [ takeEvery(types.GET, get) ]
