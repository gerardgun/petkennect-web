import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import { getVaccinationStatus } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'
import vaccinationDuck from '@reducers/pet/vaccination'

const { types } = vaccinationDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const petDetail = yield select(petDetailDuck.selectors.detail)

    // Get the vaccination types
    const petVaccinationTypes = yield call(Get, '/pet-vaccination-types/')

    const results = petVaccinationTypes.map(item => {
      const dose = petDetail.item.vaccinations.find(({ type }) => type === item.id) || {}

      return {
        ...item,
        status: getVaccinationStatus(dose),
        dose  : {
          ...dose,
          document_path    : dose.document_path ? 'https://petkennect-collection.s3.us-east-2.amazonaws.com/' + dose.document_path : null,
          employee_fullname: dose.verifier_employee ? `${dose.verifier_employee_name} ${dose.verifier_employee_lastname}` : null
        }
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results
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
