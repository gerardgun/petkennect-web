import { call, put, takeEvery } from 'redux-saga/effects'
import _get from 'lodash/get'
import _merge from 'lodash/merge'

import { Get, Patch } from '@lib/utils/http-client'

import tenantDetailDuck from '@reducers/tenant/detail'

const { types } = tenantDetailDuck

const parseTenant = tenant => {
  return {
    ...tenant,
    service_config: {
      kennel_areas: _get(tenant, 'service_config.kennel_areas', {}),
      kennel_types: _get(tenant, 'service_config.kennel_types', {}),
      boarding    : _merge({
        show_kennel_as_occupied       : false,
        show_kennel_id                : false,
        enable_client_kennel_selection: false
      }, _get(tenant, 'service_config.boarding', {}))
    }
  }
}

export function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const tenant = yield call(Get, '/tenants/current/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: parseTenant(tenant)
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

export function* _put({ payload }) {
  try {
    yield put({ type: types.PUT_PENDING })

    const tenant = yield call(Patch, '/tenants/current/0/', payload)

    yield put({
      type   : types.PUT_FULFILLED,
      payload: {
        item: parseTenant(tenant)
      }
    })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.GET, get),
  takeEvery(types.PUT, _put)
]
