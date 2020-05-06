import { call, put,select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post } from '@lib/utils/http-client'

import petImageDetailDuck from '@reducers/pet/image/detail'
import clientPetDetailDuck from '@reducers/client/pet/detail'

const { types } = petImageDetailDuck

function* deleteItem(/* { payload }*/) {
  try {
    const clientPetDetail = yield select(clientPetDetailDuck.selectors.detail)
    const pet_id = clientPetDetail.item.id
    const petImageDetail = yield select(petImageDetailDuck.selectors.detail)
    const pet_image_id = petImageDetail.item.id

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pets/${pet_id}/images/${pet_image_id}/`)

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

    const petImage = yield call(Get, `pet-images/${id}`)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: petImage
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload: { pet_id , ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `pets/${pet_id}/images/`, payload)

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

function* _put({ payload: { pet_id, pet_image_drag = {}, pet_image_drop  = {} } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Post, `pets/${pet_id}/order-images/`, [ {
      pet_image_id: pet_image_drop.id,
      order       : pet_image_drag.order
    },{
      pet_image_id: pet_image_drag.id,
      order       : pet_image_drop.order
    } ])

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
