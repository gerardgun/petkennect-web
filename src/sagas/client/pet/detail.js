import { call, put, takeEvery , select } from 'redux-saga/effects'

// import { Delete, Get, Post, Put } from '@lib/utils/http-client'

import clientPetDetailDuck from '@reducers/client/pet/detail'
import clientDetailDuck from '@reducers/client/detail'
import { Post, Patch, Delete } from '@lib/utils/http-client'

const { types } = clientPetDetailDuck

function* deleteItem(/* { id }*/) {
  try {
    const clientPetDetail = yield select(clientPetDetailDuck.selectors.detail)
    const clientDetail = yield select(clientDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `clients/${clientDetail.item.id}/pets/${clientPetDetail.item.id}/`)

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

function* post({ payload: { ...payload } }) {
  try {
    const clientDetail = yield select(clientDetailDuck.selectors.detail)
    yield put({ type: types.POST_PENDING })

    yield call(Post, `clients/${clientDetail.item.id}/pets/`, payload)

    yield put({ type: types.POST_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { ...payload } }) {
// function* _put({ payload : { id,...payload } }) {
  try {
    const clientPetDetail = yield select(clientPetDetailDuck.selectors.detail)
    const clientDetail = yield select(clientDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `clients/${clientDetail.item.id}/pets/${clientPetDetail.item.id}/`, payload)

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
