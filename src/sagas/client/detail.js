import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import { Delete, Get, Post, Put } from '@lib/utils/http-client'

import clientDetailDuck from '@reducers/client/detail'

const { types, selectors } = clientDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    // yield call(Delete, `client/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 2000)))

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

    // const client = yield call(Get, `client/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          id: 1,
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
          second_lastname: faker.name.lastName(),
          spouse: faker.name.firstName(),
          contact_date: faker.date.recent().toISOString().split('T')[0],
          contact_location: 1,
          address: faker.address.streetAddress(),
          city: 0,
          state: 0,
          zip: 0,
          phone: faker.phone.phoneNumber(),
          home_phone: faker.phone.phoneNumber(),
          work_phone: faker.phone.phoneNumber(),
          other_phone: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          referred: 1,
          send_email: true,
          parent_name: faker.name.firstName(),
          parent_lastname: faker.name.lastName(),
          auth_people: _times(3, index => ({
            id: index,
            name: faker.name.firstName(),
            relation: 'Friend'
          })),
          sign_on: faker.date.recent().toISOString().split('T')[0],
          liability: true,
          kc_waiver: true
        }
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

    // yield call(Post, 'client', payload)
    yield call(() => new Promise(resolve => setTimeout(resolve, 2000)))

    yield put({ type: types.POST_FULFILLED })
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

    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    // yield call(Put, `client/${payload.id}`, payload)

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
