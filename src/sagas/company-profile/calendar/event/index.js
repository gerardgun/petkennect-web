import { Get } from '@lib/utils/http-client'
import companyProfileCalendarEventDuck from '@reducers/company-profile/calendar/event'
import { call, put, takeEvery } from 'redux-saga/effects'
import moment from 'moment'
const { types } = companyProfileCalendarEventDuck

function* get({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const result = yield call(Get, `employee-schedules/${payload.calendarId}/events`)

    /*
      rrule: {
                dtstart  : '2021-06-12',
                freq     : 'weekly',
                until    : '2021-09-01',
                byweekday: [ 'mo', 'fr' ]
              }
    */
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: result.map(event => {
          return {
            ...event,
            title : event.name,
            allDay: event.is_all_day,
            start : moment(event.started_at, 'YYYY-MM-DD[T]HH:mm:ssZ').format('YYYY-MM-DD HH:mm'),
            end   : event.is_all_day ? moment(event.ended_at, 'YYYY-MM-DD[T]HH:mm:ssZ').hours(24).format('YYYY-MM-DD HH:mm') : moment(event.ended_at, 'YYYY-MM-DD[T]HH:mm:ssZ').format('YYYY-MM-DD HH:mm')
          }
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
