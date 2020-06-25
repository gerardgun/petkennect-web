
import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'

const { types } = petNoteDetailDuck

function* deleteItem(/* { ids } */) {
  try {
    const petDetail = yield select(petDetailDuck.selectors.detail)
    const petNoteDetail = yield select(petNoteDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pets/${petDetail.item.id}/notes/${petNoteDetail.item.id}/`)

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
    const petDetail = yield select(petDetailDuck.selectors.detail)

    const item = yield call(Get, `pets/${petDetail.item.id}/notes/${id}/`)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item
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
    const petDetail = yield select(petDetailDuck.selectors.detail)

    yield put({ type: types.POST_PENDING })

    yield call(Post, `pets/${petDetail.item.id}/notes/`, {
      ...payload
    })

    yield put({ type: types.POST_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { ...payload } }) {
  try {
    const petDetail = yield select(petDetailDuck.selectors.detail)
    const petNoteDetail = yield select(petNoteDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `pets/${petDetail.item.id}/notes/${petNoteDetail.item.id}/`, payload)

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
