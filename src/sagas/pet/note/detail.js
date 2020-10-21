
import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import petNoteDuck from '@reducers/pet/note'
import petNoteDetailDuck from '@reducers/pet/note/detail'

const { types } = petNoteDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    const petDetail = yield select(petDetailDuck.selectors.detail)
    const petNote = yield select(petNoteDuck.selectors.list)

    yield call(Delete, `pets/${petDetail.item.id}/notes/${id}/`)

    const index = petNote.items.findIndex(item => item.id === id)

    if(index !== -1) {
      let items = [ ...petNote.items ]

      items.splice(index, 1)

      yield put({
        type   : petNoteDuck.types.SET,
        payload: {
          items
        }
      })
    }

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
    const petDetail = yield select(petDetailDuck.selectors.detail)

    const item = yield call(Get, `pets/${petDetail.item.id}/notes/${id}/`)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload: { pet_id, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `pets/${pet_id}/notes/`, payload)

    const petNote = yield select(petNoteDuck.selectors.list)

    yield put({
      type   : petNoteDuck.types.SET,
      payload: {
        items: [
          {
            employee_fullname: `${result.employee_first_name} ${result.employee_last_name}`,
            ...result
          },
          ...petNote.items
        ]
      }
    })

    yield put({ type: types.POST_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload: { pet_id, id, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    const result = yield call(Patch, `pets/${pet_id}/notes/${id}/`, payload)

    const petNote = yield select(petNoteDuck.selectors.list)

    yield put({
      type   : petNoteDuck.types.SET,
      payload: {
        items: petNote.items.map(item => {
          return item.id === result.id ? {
            employee_fullname: `${result.employee_first_name} ${result.employee_last_name}`,
            ...result
          } : item
        })
      }
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
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
