import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import vaccinationDuck from '@reducers/pet/vaccination'
import moment from 'moment'

import { v4 as uuidv4 } from 'uuid'

const { types } = vaccinationDuck

function getStatus(item) {
  if(!item.created_at)
    return 'Missing'

  if(item.verified_at)
    return 'Verify!'
  if(moment
    .utc(item.expired_at, 'YYYY-MM-DD HH-mm:ss Z')
    .isSameOrBefore(
      moment()
    ))
    return 'Expired'

  if(moment
    .utc(item.expired_at, 'YYYY-MM-DD HH-mm:ss Z')
    .isSameOrBefore(
      moment().add(30,'days'),'day'
    ))
    return  'Comming due'

  return  'Current'
}

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const petDetail = yield select(petDetailDuck.selectors.detail)

    const petVaccinationTypes = yield call(Get, '/pet-vaccination-types/')

    petDetail.item.vaccinations.filter(_vaccination => _vaccination.type)

    const results = petVaccinationTypes.map(_vaccinationType => {
      const _vaccination = petDetail.item.vaccinations.find(_vaccination=> _vaccination.type === _vaccinationType.id)

      if(_vaccination)
        return _vaccination

      return {
        id       : uuidv4(),
        type     : _vaccinationType.id,
        type_name: _vaccinationType.name
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(({ verifier_employee_name = '-', verifier_employee_lastname = '', ...rest }) => ({
          employee_fullname: `${verifier_employee_name} ${verifier_employee_lastname}`,
          status           : getStatus(rest),
          ...rest
        }))
        // pagination: {
        //   ...list.pagination,
        //   meta
        // }
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
