import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Post, Patch } from '@lib/utils/http-client'

import customizedFieldGroupDetailDuck from '@reducers/customized-field/group/detail'

const { types } = customizedFieldGroupDetailDuck

function* deleteItem() {
  try {
    yield put({ type: types.DELETE_PENDING })
    const  customizedFieldGroupDetail = yield select(customizedFieldGroupDetailDuck.selectors.detail)
    yield call(Delete, `eav-entities/${customizedFieldGroupDetail.item.entity}/groups/${customizedFieldGroupDetail.item.id}`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })
    const result = yield call(Post, `eav-entities/${payload.eav_entity_id}/groups/`, {
      name: payload.name })

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

    yield call(Patch, `eav-entities/${payload.eav_entity_id}/groups/${payload.id}/`, {
      name: payload.name, order: payload.order })

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
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
