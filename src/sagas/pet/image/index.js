import { call, put, takeEvery ,select } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'
import { getFileType } from '@lib/utils/functions'

import petImageDuck from '@reducers/pet/image'

const { types, selectors } = petImageDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const { pet_id, ...filters } = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, `/pets/${pet_id}/images/`, filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: results.map(item => ({
          ...item,
          filetype: getFileType(item.filepath)
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
