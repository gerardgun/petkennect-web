import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import clientAgreementsDuck from '@reducers/client/agreement'

const { selectors, types } = clientAgreementsDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const { client_id } = yield select(selectors.filters)

    const agreements = yield call(Get, '/agreements/')
    const clientsAgreements = yield call(Get, `/clients/${client_id}/agreements/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: agreements
          .filter(({ is_active }) => is_active)
          .map(item => {
            let additionalInfo = {
              signed   : false,
              signed_at: null,
              document : null
            }

            // Check if this agreement was signed
            const signedAgreement = clientsAgreements.find(({ agreement }) => agreement === item.id)

            if(signedAgreement) {
              additionalInfo.signed = true
              additionalInfo.signed_at = signedAgreement.created_at
              additionalInfo.document = signedAgreement.document
              additionalInfo.document_filename = signedAgreement.document_filename
              additionalInfo.document_filepath = signedAgreement.document_filepath
            }

            return {
              ...item,
              ...additionalInfo
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

export default [
  takeEvery(types.GET, get)
]
