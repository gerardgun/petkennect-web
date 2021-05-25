import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Get } from '@lib/utils/http-client'

import serviceGroupDuck from '@reducers/service/group'

const { selectors, types } = serviceGroupDuck

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    let groups = yield call(Get, 'service-groups/')

    if(filters.search) {
      const rgx = new RegExp(filters.search, 'i')

      groups = groups
        .filter(({ name }) => {
          return rgx.test(name)
        })
    }

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: groups
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
