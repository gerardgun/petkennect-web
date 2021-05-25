import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'
import * as petKindSaga from '@sagas/pet/kind'
import * as serviceGroupSaga from '@sagas/service/group'

import locationDuck from '@reducers/location'
import petKindDuck from '@reducers/pet/kind'
import serviceDetailDuck from '@reducers/service/detail'
import serviceGroupDuck from '@reducers/service/group'

const { types } = serviceDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })

    let locationList = yield select(locationDuck.selectors.list)
    let petKindList = yield select(petKindDuck.selectors.list)
    let serviceGroupList = yield select(serviceGroupDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    if(petKindList.items.length === 0) {
      yield* petKindSaga.get()

      petKindList = yield select(petKindDuck.selectors.list)
    }

    if(serviceGroupList.items.length === 0) {
      yield* serviceGroupSaga.get()

      serviceGroupList = yield select(serviceGroupDuck.selectors.list)
    }

    yield put({
      payload: {
        form: {
          location_options: locationList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          pet_kind_options: petKindList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          service_group_options: serviceGroupList.items.map(({ id, name }) => ({
            text : name,
            value: id
          }))
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

export default [
  takeEvery(types.CREATE, create),
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
