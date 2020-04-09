import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import organizationDetailDuck from '@reducers/organization/detail'
import organizationCompanyDuck from '@reducers/organization/company'

const { types, selectors } = organizationDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `organizations/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const { companies, ...organization } = yield call(Get, `organizations/${id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: organization
      }
    })

    yield put({
      type   : organizationCompanyDuck.types.GET_FULFILLED,
      payload: {
        items: companies
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, 'organizations/', payload)

    yield put({
      type: types.POST_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `organizations/${payload.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
