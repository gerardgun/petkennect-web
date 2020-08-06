import { call, put,select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import clientAgreementsDuck from '@reducers/client/agreement'

import clientDetailDuck from '@reducers/client/detail'

const { types } = clientAgreementsDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const clientDetail = yield select(clientDetailDuck.selectors.detail)
    var clientsAgreements = yield call(Get, `/clients/${clientDetail.item.id}/agreements/`)
    clientsAgreements = clientsAgreements.map(({ ...rest })=> ({
      is_pending: false,
      signed_at : rest.created_at,
      name      : rest.agreement_name,
      ...rest
    }))
    var agreements = yield call(Get, '/agreements/')
    agreements = agreements.map(({ ...rest })=> ({
      is_pending: true,
      signed_at : null,
      ...rest
    }))

    const finalAgreements = agreements.concat(clientsAgreements)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: finalAgreements
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
