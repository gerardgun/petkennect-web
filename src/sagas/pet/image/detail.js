import { call, put,select, takeEvery } from 'redux-saga/effects'

import { Delete, Get, Patch, Post } from '@lib/utils/http-client'

import petImageDetailDuck from '@reducers/pet/image/detail'
import petDetailDuck from '@reducers/pet/detail'

const { types } = petImageDetailDuck
// const { types :listTypes } = petImageDuck

function* deleteItem(/* { payload }*/) {
  try {
    // const petImage = yield select(petImageDuck.selectors.list)
    const petDetail = yield select(petDetailDuck.selectors.detail)
    const pet_id = petDetail.item.id
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

function* post({ payload }) {
  const { images, is_profile } = payload

  try {
    yield put({ type: types.POST_PENDING })

    // Get current pet detail item
    const petDetail = yield select(petDetailDuck.selectors.detail)

    // Upload new pet image
    let [ result ] = yield call(Post, `pets/${petDetail.item.id}/images/`, { images })

    // Set image as profile if is_profile=true
    if(is_profile === true) {
      yield call(Patch, `pets/${petDetail.item.id}/images/${result.id}/`, { is_profile })

      result.is_profile = true

      // Update current pet detail item
      // image_filepath
      yield put({
        type   : petDetailDuck.types.SET,
        payload: {
          item: {
            ...petDetail.item,
            image_filepath: result.filepath
          }
        }
      })
    }

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

function* _put({ payload: { pet_id, pet_image_id, ...payload } }) {
  try {
    // const petImage = yield select(petImageDuck.selectors.list)

    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `pets/${pet_id}/images/${pet_image_id}/`, payload)
    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* editorPost({ payload }) {
  const { file: images, description = '', is_profile , type = 'image' } = payload

  try {
    yield put({ type: types.EDITOR_POST_PENDING })

    // Get current pet detail item
    const petDetail = yield select(petDetailDuck.selectors.detail)

    // Upload new pet image
    let [ result ] = yield call(Post, `pets/${petDetail.item.id}/images/`, { images , description , type })

    // Set image as profile if is_profile=true
    if(is_profile === true) {
      yield call(Patch, `pets/${petDetail.item.id}/images/${result.id}/`, { is_profile })

      result.is_profile = true

      // Update current pet detail item
      // image_filepath
      yield put({
        type   : petDetailDuck.types.SET,
        payload: {
          item: {
            ...petDetail.item,
            image_filepath: result.filepath
          }
        }
      })
    }

    yield put({
      type   : types.EDITOR_POST_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.EDITOR_POST_FAILURE,
      error: e
    })
  }
}

function* editorPut({ payload }) {
  const { file: images, is_profile , description , type = 'image' } = payload

  try {
    yield put({ type: types.EDITOR_PUT_PENDING })

    // Get current pet detail item
    const petDetail = yield select(petDetailDuck.selectors.detail)

    // Upload new pet image
    let [ result ] = yield call(Patch, `pets/${petDetail.item.id}/images/`, { images, is_profile , description, type })

    yield put({
      type   : types.EDITOR_PUT_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.EDITOR_PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.EDITOR_POST, editorPost),
  takeEvery(types.EDITOR_PUT, editorPut)
]
