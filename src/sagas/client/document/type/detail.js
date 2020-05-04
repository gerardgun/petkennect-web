import { call, put, takeEvery } from 'redux-saga/effects'

// import { Delete, Get, Post, Put } from '@lib/utils/http-client'

import clientDocumentTypeDetailDuck from '@reducers/client/document/type/detail'

const { types } = clientDocumentTypeDetailDuck

function* deleteItem(/* { ids } */) {
  try {
    yield put({ type: types.DELETE_PENDING })

    // yield call(Delete, `client/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 2000)))

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get(/* { id } */) {
  try {
    yield put({ type: types.GET_PENDING })

    // const client = yield call(Get, `client/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          id: 1
        }
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post(/* { payload: { client_id }, ...payload }*/) {
  // try {
  //   yield put({ type: types.POST_PENDING })
  //   const { id: upload_employee } = localStorage.getItem('@auth_user')

  //   yield call(Post, `clients/${client_id}/documents/`, { ...payload, upload_employee })

  //   yield put({ type: types.POST_FULFILLED })
  // } catch (e) {
  //   yield put({
  //     type : types.POST_FAILURE,
  //     error: e
  //   })
  // }
}

function* _put(/* { payload } */) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // yield call(Put, `client/${payload.id}`, payload)

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
