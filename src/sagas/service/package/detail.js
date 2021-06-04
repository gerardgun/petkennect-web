import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import servicePackageDetailDuck from '@reducers/service/package/detail'

const { selectors, types } = servicePackageDetailDuck

function* create(payload, extra) {
  try {
    yield put({ type: types.GET_PENDING })
    yield put({
      payload: {
        form: {
          service_type_options    : [],
          location_options        : [],
          reservation_type_options: []
        }
      },
      type: types.GET_FULFILLED
    })
  } catch (e) {
    yield put({
      error: e,
      type : types.GET_FAILURE
    })
  }
}

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `services/${id}/`)

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

    const service = yield call(Get, `services/${id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: service
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

    const service = yield call(Post, 'services/', payload)

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

function* _put({ payload: { type, ...payload } }) {
  /* eslint no-unused-vars: 0 */ //

  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `services/${payload.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* createGetServiceTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const { results } = yield call(Get, 'services/', {
      ordering         : 'name',
      search           : payload.search,
      service_group__id: payload.service_group,
      page_size        : 10
    })

    const detail = yield select(selectors.detail)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          service_type_options: results.map(({ id, name }) => ({
            text : name,
            value: id
          }))
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

export default [
  takeEvery(types.CREATE, create),
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.CREATE_GET_SERVICE_TYPES, createGetServiceTypes)
]
