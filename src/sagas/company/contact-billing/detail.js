import { put, takeEvery } from 'redux-saga/effects'

import companyContactBillingDetailDuck from '@reducers/company/contact-billing/detail'

const { types } = companyContactBillingDetailDuck

function* create({ payload }) {
  console.log(payload)
  try {
    yield put({ type: types.GET_PENDING })
    yield put({
      payload: {
        form: {
          cards: [
            {
              id       : 1,
              name     : 'Credit Card 1'
            },
            {
              id       : 2,
              name     : 'Credit Card 2'
            }
          ]
        }
      },
      type: types.GET_FULFILLED
    })
  } catch (e) {
    yield put({
      error: e,
      type : types.GET_FAILURE
    })
  }
}

export default [ takeEvery(types.CREATE, create) ]
