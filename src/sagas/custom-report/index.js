import {  put,  takeEvery } from 'redux-saga/effects'

import customReportDuck from '@reducers/custom-report'

const { types } = customReportDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: [ { name: 'Day Reports',subReport: [ { name: 'Boarding Schedule', is_new: true },{ name: 'Day Camp Schedule', is_new: false },{ name: 'Day Sales Report', is_new: false },{ name: 'Services Calender', is_new: false },{ name: 'Training Schedule', is_new: false },{ name: 'Service Calendar', is_new: false },{ name: 'Vaccination Due', is_new: false } ] },
          { name: 'Financial Reports',subReport: [ { name: 'AR/Aging', is_new: false },{ name: 'Boarding Revenue Per Night', is_new: false },{ name: 'Sales by Payments', is_new: false },{ name: 'Items Sold Report', is_new: false },{ name: 'Sales by Services', is_new: false } ] },
          { name: 'Customer Metrics',subReport: [ { name: 'Cancellations', is_new: true },{ name: 'Client Retention', is_new: false },{ name: 'Declined Clients', is_new: false }, { name: 'New Clients', is_new: false },{ name: 'Vaccination Due', is_new: false },{ name: 'Loadging', is_new: false },{ name: 'Grooming', is_new: false } ] },
          { name: 'Services Reports',subReport: [ { name: 'Boarding', is_new: false },{ name: 'DayCamp', is_new: true },{ name: 'Forecast Calendar', is_new: false },{ name: 'Grooming', is_new: false },{ name: 'Loadging', is_new: false },{ name: 'Loadging', is_new: false },{ name: 'Loadging', is_new: false } ] },
          { name: 'Customer Metric',subReport: [ { name: 'Cancellations', is_new: true },{ name: 'Client Retention', is_new: false },{ name: 'Declined Clients', is_new: false },{ name: 'Sold Report', is_new: false },{ name: 'Loadging', is_new: false } ] },
          { name: 'HR/Perfomance ',subReport: [ { name: 'Grooming Productivity', is_new: true },{ name: 'Labor Analysis', is_new: false },{ name: 'Staff Anniversaries', is_new: false } ,{ name: 'Trainer Productivity', is_new: false }, { name: 'Service Calendar', is_new: false } ] }
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
