import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Patch, Post } from '@lib/utils/http-client'

import foodUnitDetailDuck from '@reducers/service/food/unit/detail'

const { selectors, types } = foodUnitDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })

    const food_types = yield call(Get, 'food-types/', {
      ordering: 'name'
    })

    const detail = yield select(selectors.detail)

    yield put({
      payload: {
        form: {
          ...detail.form,
          food_type_options: food_types.map(({ id, name }) => ({
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

    yield call(Delete, `food-units/${id}/`)

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

    const result = yield call(Post, 'food-units/', {
      name     : payload.name,
      food_type: payload.food_type_id
    })

    yield put({
      type   : types.POST_FULFILLED,
      payload: {
        item: result
      }
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

    const result = yield call(Patch, `food-units/${payload.id}/`, {
      name     : payload.name,
      food_type: payload.food_type_id
    })

    yield put({
      type   : types.PUT_FULFILLED,
      payload: {
        item: result
      }
    })
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
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
