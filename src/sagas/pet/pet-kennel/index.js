import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import petKennelDuck from '@reducers/pet/pet-kennel'

const { selectors, types } = petKennelDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })
    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, '/kennels/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => ({
          ...item,
          thumbnail_path: item.thumbnail_path ? `https://petkennect-collection.s3.us-east-2.amazonaws.com/${item.thumbnail_path}` : null
        })),
        pagination: {
          ...list.pagination,
          meta
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

export default [
  takeEvery(types.GET, get)
]
