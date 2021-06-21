import { Get } from '@lib/utils/http-client'
import setupAddonServiceSettingDuck from '@reducers/service/addon/general/add-on-service/'
import { call, put, select, takeEvery } from 'redux-saga/effects'

const { types, selectors } = setupAddonServiceSettingDuck

function* get(/* { payload } */) {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)
    const list = yield select(selectors.list)

    const { results, ...meta } = yield call(Get, 'services-variations/', filters)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items     : results,
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

export default [ takeEvery(types.GET, get) ]
