
import { call, put, takeEvery, select, all } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import petVaccinationDuck from '@reducers/pet/vaccination'
import petVaccinationDetailDuck from '@reducers/pet/vaccination/detail'

const { types } = petVaccinationDetailDuck

function* deleteItem(/* { ids } */) {
  try {
    const petDetail = yield select(petDetailDuck.selectors.detail)
    const petVaccinationDetail = yield select(petVaccinationDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pets/${petDetail.item.id}/vaccinations/${petVaccinationDetail.item.id}/`)

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

    const item = yield call(Get, `pets/${petDetail.item.id}/vaccinations/${id}/`)
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

function* post({ payload: { ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    /** Get id for vaccinationDocumentType for this tenant */
    const documenTypes = yield call(Get, 'client-document-types/')

    const { id : documentTypeId } = documenTypes.find(_documentType => _documentType.type === 'V') || {}

    /** Creating client document */
    const petDetail = yield select(petDetailDuck.selectors.detail)

    const resultDocument = yield call(Post, `clients/${petDetail.item.client}/documents/`, {
      file: payload.file,
      type: documentTypeId
    })

    /** Creating all vaccinations listed */
    yield all(payload.vaccinations.map(_vaccination =>
      call(Post, `pets/${petDetail.item.id}/vaccinations/`, {
        expired_at: _vaccination.expired_at,
        type      : _vaccination.type,
        document  : resultDocument.id
      })
    ))

    yield put({ type: types.POST_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { ...payload } }) {
  try {
    const petDetail = yield select(petDetailDuck.selectors.detail)
    const petVaccinationDetail = yield select(petVaccinationDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `pets/${petDetail.item.id}/vaccinations/${petVaccinationDetail.item.id}/`, payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* sendEmail({ payload }) {
  try {
    // selector.selected_items
    const { item : { id:pet_id } = {} } = yield select(petDetailDuck.selectors.detail)
    const { selector : { selected_items = [] } = {} } = yield select(petVaccinationDuck.selectors.list)

    yield put({ type: types.SEND_PENDING })
    const result = yield call(Post, `pets/${pet_id}/send-reminder-vaccinations/`, {
      body_title     : payload.subject,
      vaccination_ids: selected_items.map(({ id })=> id),
      ...payload
    })

    yield put({
      type   : types.SEND_FULFILLED,
      payload: result
    })
  } catch (e) {
    yield put({
      type : types.SEND_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.SEND, sendEmail)
]
