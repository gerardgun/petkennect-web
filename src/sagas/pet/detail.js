import { call, put, select, takeEvery } from 'redux-saga/effects'
import _times from 'lodash/times'
import faker from 'faker'

import { Delete, Get, Post, Put } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'

const { types, selectors } = petDetailDuck

function* deleteItem({ ids }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    // yield call(Delete, `pet/${id}`)
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

    // const pet = yield call(Get, `pet/${id}`)
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          id: 1,
          name: faker.name.firstName(),
          breed_id: 1,
          date_birth: faker.date.recent().toISOString().split('T')[0],
          weight: faker.random.number(50),
          sex: 1,
          size: faker.random.arrayElement([ 1, 2, 3, 4 ]),
          reason_id: faker.random.arrayElement([ 1, 2, 3, 4 ]),
          standing_reservation: faker.random.arrayElement([ 1, 2 ]),
          special_instructions: faker.lorem.paragraph(1),
          behavioral: faker.lorem.paragraph(1),
          fixed: true,
          retire: true,
          date_rabies: faker.date.recent().toISOString().split('T')[0],
          date_bordetella: faker.date.recent().toISOString().split('T')[0],
          date_notification_set_on: faker.date.recent().toISOString().split('T')[0],
          date_dhlpp: faker.date.recent().toISOString().split('T')[0],
          date_neg_fecal: faker.date.recent().toISOString().split('T')[0],
          date_influenza: faker.date.recent().toISOString().split('T')[0],
          coloring: faker.lorem.words(2),
          received_dog_from: faker.lorem.words(2),
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

    // yield call(Post, 'pet', payload)
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
    // yield call(Put, `pet/${payload.id}`, payload)

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
