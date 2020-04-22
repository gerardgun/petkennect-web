import { call, put, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import transactionDuck from '@reducers/transaction'

const { types } = transactionDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const filters = yield select(selectors.filters)
    const transactions = yield call(Get, '/transactions/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: transactions
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
