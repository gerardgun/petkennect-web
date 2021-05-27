import { call, put, takeEvery, select } from 'redux-saga/effects'

import dashboardExpressDuck from '@reducers/dashboard/express-check-in'

const { selectors, types } = dashboardExpressDuck

function* get() {
  try {
    const filters = yield select(selectors.filters)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    yield put({ type: types.GET_PENDING })

    const results = [ { id: 1, pet: { name: 'Boots' }, client: { name: 'James back' }, type: 'Full Day', end_date: '06/18/2021', end_time: '18:50' },
      { id: 2, pet: { name: 'Loki' }, client: { name: 'Allseia Med' }, type: 'Day Care', end_date: '06/18/2021', end_time: '18:50'  },
      { id: 3, pet: { name: 'Tommy' }, client: { name: 'Allseia Med' }, type: 'Full Day', end_date: '03/18/2021', end_time: '18:50'  },
      { id: 4, pet: { name: 'Tizen' }, client: { name: 'Megan Justice' }, type: 'Fitness', end_date: '07/18/2021', end_time: '21:50' },
      { id: 5, pet: { name: 'Goldy' }, client: { name: 'Megan Justice' }, type: 'Full Day', end_date: '04/18/2021', end_time: '18:50' },
      { id: 6, pet: { name: 'Pemintay' },client: { name: 'Jhon James' }, type: 'Fitness', end_date: '06/18/2021', end_time: '08:50'  }

    ]
    let finalResult
    if(filters.search.length != 0)
      finalResult = results.filter((item)=>filters.search.includes(item.id))
    else finalResult = []
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: finalResult

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
