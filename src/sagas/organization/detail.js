import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import organizationDetailDuck from '@reducers/organization/detail'
import organizationCompanyDuck from '@reducers/organization/company'
import zipDetailDuck from '@reducers/zip/detail'

const { types } = organizationDetailDuck

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
    yield put({ type: organizationCompanyDuck.types.GET_PENDING })

    const { companies, ...organization } = yield call(Get, `organizations/${id}`)

    const zipDetail = yield select(zipDetailDuck.selectors.detail)

    if(organization.zip_code !== zipDetail.item.id)
      yield put({
        type: zipDetailDuck.types.RESET_ITEM
      })

    // Setting data of organization
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

    // Load zip data if zip code exists and it isn't loaded yet
    if(organization.zip_code !== zipDetail.item.id)
      yield put({
        type: zipDetailDuck.types.GET,
        id  : organization.zip_code
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

    payload.is_formdata = true

    const result = yield call(Post, 'organizations/', payload)

    yield put({
      type   : types.POST_FULFILLED,
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

    payload.is_formdata = true

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
