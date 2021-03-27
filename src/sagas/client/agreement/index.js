import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import clientAgreementDuck from '@reducers/client/agreement'
import clientAgreementSignedDuck from '@reducers/client/agreement/signed'
import clientAgreementUnsignedDuck from '@reducers/client/agreement/unsigned'

const { selectors, types } = clientAgreementDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })
    yield put({ type: clientAgreementSignedDuck.types.GET_PENDING })
    yield put({ type: clientAgreementUnsignedDuck.types.GET_PENDING })

    const { client_id } = yield select(selectors.filters)

    const agreements = yield call(Get, '/agreements/')
    const clientsAgreements = yield call(Get, `/clients/${client_id}/agreements/`)
    const items = agreements
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

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items
      }
    })

    yield put({
      type   : clientAgreementSignedDuck.types.GET_FULFILLED,
      payload: {
        items: items.filter(item => item.signed === true)
      }
    })

    yield put({
      type   : clientAgreementUnsignedDuck.types.GET_FULFILLED,
      payload: {
        items: items.filter(item => item.signed === false)
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
