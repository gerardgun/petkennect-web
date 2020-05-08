import { call, put,select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Post } from '@lib/utils/http-client'

import petImageDetailDuck from '@reducers/pet/image/detail'
import petImageDuck from '@reducers/pet/image'
import petDetailDuck from '@reducers/pet/detail'

const { types } = petImageDetailDuck
const { types :listTypes } = petImageDuck

function* deleteItem(/* { payload }*/) {
  try {
    const petImage = yield select(petImageDuck.selectors.list)
    const petDetail = yield select(petDetailDuck.selectors.detail)
    const pet_id = petDetail.item.id
    const petImageDetail = yield select(petImageDetailDuck.selectors.detail)
    const pet_image_id = petImageDetail.item.id

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pets/${pet_id}/images/${pet_image_id}/`)

    yield put({ type: types.DELETE_FULFILLED })

    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...petImage.items.filter(_petImage =>_petImage.id !== pet_image_id) ]
      }
    })
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
  const petImage = yield select(petImageDuck.selectors.list)

  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `pets/${pet_id}/images/`, payload)

    yield put({
      type   : types.POST_FULFILLED,
      payload: result
    })

    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...petImage.items, ...result ]
      }
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload: { pet_id, pet_images } }) {
  try {
    // const petImage = yield select(petImageDuck.selectors.list)

    yield put({
      type   : listTypes.GET_FULFILLED,
      payload: {
        items: [ ...pet_images ]
      }
    })

    yield put({ type: types.PUT_PENDING })

    yield call(Post, `pets/${pet_id}/order-images/`, pet_images)
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
