import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'
import { Status } from '@lib/constants/client'

import clientDetailDuck from '@reducers/client/detail'
import zipDetailDuck from '@reducers/zip/detail'

const { selectors, types } = clientDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Post, 'clean-clients/', {
      client_ids: ids
    })

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

export function* get({ id }) {
  try {
    yield put({ type: types.GET_PENDING })

    const client = yield call(Get, `clients/${id}/`)
    let addresses = yield call(Get, `clients/${id}/addresses/`)

    if(addresses.length > 0) {
      const zips = yield all(addresses.map(({ zip_code }) =>
        call(Get, `zips/${zip_code}/`)
      ))

      // wip Add type to client_addresses model
      addresses = addresses.map((item, index) => ({
        ...item,
        type: 'home',
        zip : zips[index]
      }))
    }

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          ...client,
          addresses,
          emergency_contact_phones: !Array.isArray(client.emergency_contact_phones) ? [] : client.emergency_contact_phones,
          thumbnail_path          : client.thumbnail_path ? `https://petkennect-collection.s3.us-east-2.amazonaws.com/${client.thumbnail_path}` : null,
          status                  : faker.random.arrayElement(Object.keys(Status))
        }
      }
    })

    if(client.zip_code)
      yield put({
        type: zipDetailDuck.types.GET,
        id  : client.zip_code
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

    let result = null

    if(payload.user) result = yield call(Post, 'profile-clients/', payload)
    else result = yield call(Post, 'clients/', payload)

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

    if('email' in payload)
      delete payload.email

    yield call(Patch, `clients/${payload.id}/`, payload)

    /** Managing addresses */
    const clientDetail = yield select(selectors.detail)

    if('addresses' in payload) {
      const addressesToCreate = payload.addresses.filter(item => !('id' in item))
      const addressesToUpdate = payload.addresses.filter(item => 'id' in item)
      const addressesToDelete = clientDetail.item.addresses.filter(({ id }) => !payload.addresses.some(item => item.id === id))

      if(addressesToCreate.length > 0)
        yield all(addressesToCreate.map(({ description, zip_code }) =>
          call(Post, `clients/${payload.id}/addresses/`, { description, zip_code })
        ))

      if(addressesToUpdate.length > 0)
        yield all(addressesToUpdate.map(({ id, description, zip_code }) =>
          call(Patch, `clients/${payload.id}/addresses/${id}/`, { description, zip_code })
        ))

      if(addressesToDelete.length > 0)
        yield all(addressesToDelete.map(({ id }) =>
          call(Delete, `clients/${payload.id}/addresses/${id}/`)
        ))
    }

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
