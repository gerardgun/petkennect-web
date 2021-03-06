import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import companyDetailDuck from '@reducers/company/detail'
import zipDetailDuck from '@reducers/zip/detail'

const { types } = companyDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `companies/${id}/`)

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

    const company = yield call(Get, `companies/${id}/`)

    const zipDetail = yield select(zipDetailDuck.selectors.detail)

    if(company.zip_code !== zipDetail.item.id)
      yield put({
        type: zipDetailDuck.types.RESET_ITEM
      })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: company
      }
    })

    // Load zip data if zip code exists and it isn't loaded yet
    if(company.zip_code !== zipDetail.item.id)
      yield put({
        type: zipDetailDuck.types.GET,
        id  : company.zip_code
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

    const result = yield call(Post, 'companies/', payload)

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

function* _put({ payload: { id, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    payload.is_formdata = true

    yield call(Patch, `companies/${id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* setItem({ item, mode }) {
  const zipDetail = yield select(zipDetailDuck.selectors.detail)

  if(mode === 'UPDATE')
    // Load zip data if zip code exists and it isn't loaded yet
    if(item.zip_code !== zipDetail.item.id) {
      yield put({
        type: zipDetailDuck.types.RESET_ITEM
      })

      yield put({
        type: zipDetailDuck.types.GET,
        id  : item.zip_code
      })
    }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.SET_ITEM, setItem)
]
