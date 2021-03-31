
import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Post, Patch } from '@lib/utils/http-client'

import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'
import onlineRequestNoteDuck from '@reducers/online-request/note'
import clientSubmissionDuck from '@reducers/online-request/client-submission'
import onlineRequestNoteDetailDuck from '@reducers/online-request/note/detail'

const { types } = onlineRequestNoteDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    const clientSubmissionDetail = yield select(clientSubmissionDetailDuck.selectors.detail)

    yield call(Delete, `requests/${clientSubmissionDetail.item.id}/notes/${id}/`)

    const requestNote = yield select(onlineRequestNoteDuck.selectors.list)

    const index = requestNote.items.findIndex(item => item.id === id)

    if(index !== -1) {
      let items = [ ...requestNote.items ]

      items.splice(index, 1)

      yield put({
        type   : onlineRequestNoteDuck.types.SET,
        payload: {
          items
        }
      })
    }

    const clientSubmission = yield select(clientSubmissionDuck.selectors.list)

    yield put({
      type   : clientSubmissionDuck.types.SET,
      payload: {
        items: clientSubmission.items.map(item => {
          return item.id === clientSubmissionDetail.item.id ? ({
            ...item,
            count_notes: requestNote.items.length - 1
          }) : item
        })
      }
    })

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

    const clientSubmissionDetail = yield select(clientSubmissionDetailDuck.selectors.detail)

    const result = yield call(Post, `requests/${clientSubmissionDetail.item.id}/notes/`, payload)

    yield put({
      type: onlineRequestNoteDuck.types.GET
    })

    const requestNote = yield select(onlineRequestNoteDuck.selectors.list)
    const clientSubmission = yield select(clientSubmissionDuck.selectors.list)

    yield put({
      type   : clientSubmissionDuck.types.SET,
      payload: {
        items: clientSubmission.items.map(item => {
          return item.id === clientSubmissionDetail.item.id ? ({
            ...item,
            count_notes: requestNote.items.length + 1
          }) : item
        })
      }
    })

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

function* _put({ payload: { id, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    const clientSubmissionDetail = yield select(clientSubmissionDetailDuck.selectors.detail)

    yield call(Patch, `requests/${clientSubmissionDetail.item.id}/notes/${id}/`, payload)

    yield put({
      type: onlineRequestNoteDuck.types.GET
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
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
