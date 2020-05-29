import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import serviceAddonDetailDuck from '@reducers/service/addon/detail'
import serviceDetailDuck from '@reducers/service/detail'
import serviceAddonGroupDetailDuck from '@reducers/service/addon/group/detail'

const { types } = serviceAddonDetailDuck

export function* deleteItem({ ids: [ id ] }) {
  try {
    const { item : { id: service_id } = {} } = yield select(serviceDetailDuck.selectors.detail)
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `services/${service_id}/addons/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ id }) {
  /** unused */
  try {
    const { item : { id: service_id } = {} } = yield select(serviceDetailDuck.selectors.detail)
    yield put({ type: types.GET_PENDING })

    // const service = yield call(Get, `services/${service_id}/what-ever-addon/${id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        // item: service
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
    const { item : { id: service_id } = {} } = yield select(serviceDetailDuck.selectors.detail)
    const { item : { id: group_code } = {} } = yield select(serviceAddonGroupDetailDuck.selectors.detail)

    yield put({ type: types.POST_PENDING })

    const service = yield call(Post, `services/${service_id}/addons/`, { group_code,...payload })

    yield put({
      type   : types.POST_FULFILLED,
      payload: service
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

export function* _put({ payload : { id,...payload } }) {
  /* eslint no-unused-vars: 0 */ //

  try {
    const { item : { id: service_id } = {} } = yield select(serviceDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `services/${service_id}/addons/${id}/`, payload)

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
