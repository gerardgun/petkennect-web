import { put, select, takeLatest } from 'redux-saga/effects'

// import { Get } from '@lib/utils/http-client'
import companyProfileCalendarDuck from '@reducers/company-profile/calendar'
import * as scheduleSaga from '@sagas/employee/schedule'
import scheduleDuck from '@reducers/employee/schedule'

const { selectors, types } = companyProfileCalendarDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // Load items
    const filters = yield select(selectors.filters)
    yield put({ type: scheduleDuck.types.SET_FILTERS, payload: filters })

    yield* scheduleSaga.get()
    const calendarList = yield select(scheduleDuck.selectors.list)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items     : calendarList.items,
        pagination: {
          ...calendarList.pagination
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

export default [ takeLatest(types.GET, get) ]
