import { call, put, takeEvery } from 'redux-saga/effects'
import { Delete, Post, Patch } from '@lib/utils/http-client'

import serviceAttributeValueDetailDuck from '@reducers/service/service-attribute-value/detail'

const { types } = serviceAttributeValueDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })
    yield call(Delete, `service-attribute-values/${id}`)
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
    const result = yield call(Post, 'service-attribute-values/', {
      service_attribute: payload.service_attribute,
      value_display    : payload.value_display,
      value            : payload.value == null ? payload.value_display : payload.value
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

function* _put({ payload }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `/service-attribute-values/${payload.id}/`, {
      value_display: payload.value_display,
      value        : payload.value == null ? payload.value_display : payload.value
    })

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
