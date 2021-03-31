import { call, put, takeEvery } from 'redux-saga/effects'

import medicationDuck from '@reducers/pet/medication-setting/medication'

const { types } = medicationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: [ { id: 0, name: 'Quadritrop', purpose: 'Skin Irritation', type: 'Cream', charges: 'true', price: '$2.00' },
          { id: 1, name: 'Benedryl', purpose: 'Allergies', type: 'Pill', charges: 'true', price: '$3.00' },
          { id: 2, name: 'Amoxicillin', purpose: 'Antibiotic', type: 'Liquid', charges: 'false', price: '$0.00' },
          { id: 3, name: 'Valium', purpose: 'Seizures', type: 'Injectable', charges: 'true', price: '$3.50' }
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

