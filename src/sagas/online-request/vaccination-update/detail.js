import { call, put, takeEvery } from 'redux-saga/effects'

import { Patch } from '@lib/utils/http-client'

import vaccinationUpdateDetailDuck from '@reducers/online-request/vaccination-update/detail'

const { types } = vaccinationUpdateDetailDuck

function* patch({ payload: { id, ...payload } }) {
  try {
    yield put({ type: types.PATCH_PENDING })

    yield call(Patch, `requests/${id}/`, payload)

    yield put({ type: types.PATCH_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PATCH_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.PATCH, patch)
]
