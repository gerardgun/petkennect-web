import { call, put, select, takeEvery } from 'redux-saga/effects'

import { booleanOptions } from '@lib/constants'
import { ChargeTypeOptions } from '@lib/constants/service'
import { Delete, Get, Post, Patch } from '@lib/utils/http-client'
import * as kennelAreaSaga from '@sagas/order/service/boarding/kennel/area'

import kennelAreaDuck from '@reducers/order/service/boarding/kennel/area'
import kennelTypeDetailDuck from '@reducers/order/service/boarding/kennel/type/detail'

const { types } = kennelTypeDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })

    let kennelAreaList = yield select(kennelAreaDuck.selectors.list)

    if(kennelAreaList.items.length === 0) {
      yield* kennelAreaSaga.get()

      kennelAreaList = yield select(kennelAreaDuck.selectors.list)
    }

    yield put({
      payload: {
        form: {
          kennel_area_options: kennelAreaList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          is_surcharge_options: booleanOptions,
          charge_type_options : ChargeTypeOptions
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

    yield call(Delete, `orders/services/boardings/kennels/${id}/`)

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

    const petKind = yield call(Get, `orders/services/boardings/kennels/${id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: petKind
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

    const result = yield call(Post, 'orders/services/boardings/kennels/', payload)

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

    yield call(Patch, `orders/services/boardings/kennels/${payload.id}/`, payload)

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
