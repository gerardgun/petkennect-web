import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import priceMasterDuck from '@reducers/price-master'

const { types } = priceMasterDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    let priceMaster = yield call(Get, '/training-commands/')
    priceMaster = priceMaster.map(({ ...rest })=> ({
      type       : 'Service',
      subcategory: 'Daycamp',
      name       : 'Happy Day',
      location   : '2HR_Location',
      price      : '23',
      stock      : 'Yes',
      ...rest
    }))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: priceMaster
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
