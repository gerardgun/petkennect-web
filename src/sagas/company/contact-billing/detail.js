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
              id         : 1,
              name       : 'Credit Card 1',
              cc_number: '4966 8270 1684 XXXX',
              cc_exp: '02/25',
              cc_cvv: '123',
            },
            {
              id         : 1,
              name       : 'Credit Card 1',
              cc_number: '4966 8270 1684 XXXX',
              cc_exp: '02/25',
              cc_cvc: '123',
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
