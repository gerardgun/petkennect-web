import { call, put, takeEvery } from 'redux-saga/effects'

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

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: company
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload: {
  main_admin: main_admin_email,
  main_admin_first_name,
  main_admin_last_name,
  user,
  user_exists,
  phones,
  addresses,
  ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    const main_admin = JSON.stringify({
      status: true ,
      ...(user_exists
        ? { user }
        : {
          status: 'true', first_name: main_admin_first_name, last_name: main_admin_last_name , email: main_admin_email
        })
    })
    const result = yield call(Post, 'companies/', {
      ...payload,
      phones   : JSON.stringify(phones),
      addresses: JSON.stringify(addresses),
      main_admin
    })

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

function* _put({
  payload: {
    main_admin: main_admin_email,
    main_admin_first_name,
    main_admin_last_name,
    user,
    user_exists,
    phones,
    addresses,
    ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    const main_admin = JSON.stringify({
      status: true ,
      ...(user_exists
        ? { user }
        : {
          status: 'true', first_name: main_admin_first_name, last_name: main_admin_last_name , email: main_admin_email
        })
    })

    yield call(Patch, `companies/${payload.id}/`, {
      ...payload,
      phones   : JSON.stringify(phones),
      addresses: JSON.stringify(addresses),
      main_admin })

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* setItem({ item, mode }) {
  if(mode === 'UPDATE') {
    yield put({
      type: zipDetailDuck.types.RESET_ITEM
    })

    if(item.zip_code)
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
