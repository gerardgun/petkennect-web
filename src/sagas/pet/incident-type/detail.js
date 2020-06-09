import { call, put, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petIncidentTypeDetailDuck from '@reducers/pet/incident-type/detail'

const { types } = petIncidentTypeDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pet-incident-types/${id}/`)

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

    const petIncidentType = yield call(Get, `pet-incident-types/${id}/`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: petIncidentType
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload: { has_limit, limit, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })
    let body = {}
    if(has_limit && limit)
      body = {
        limit,
        ...payload
      }
    else
      body = {
        ...payload
      }

    const result = yield call(Post, 'pet-incident-types/', body)

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

function* _put({ payload :  { has_limit, limit, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })
    let body = {}
    if(has_limit && limit)
      body = {
        limit,
        ...payload
      }
    else
      body = {
        ...payload
      }

    yield call(Patch, `pet-incident-types/${payload.id}/`, body)

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
