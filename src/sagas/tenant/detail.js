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
        enable_client_kennel_selection: false,
        pricing_model_id              : 1,
        all_inclusive                 : 1,
        day_service_price             : 1,
        activity_id                   : 1,
        pricing_offer_discount        : 1,
        compute_dog_pricing           : 1,
        discount_apply_to             : 1,
        discount_per_dog              : 1,
        discount_per_dog_price        : 1,
        season_peak                   : 1,
        peak_price_surcharge          : 1,
        dog_size                      : 1,
        time_checkout                 : '12:00',
        checkout_prior                : 1,
        checkout_after                : 1,
        file_name                     : '/images/petKennectTenantLogo.png'
      }, _get(tenant, 'service_config.boarding', {})),
      appointment_capacity: _merge({
        enable_booking_override: false
      }, _get(tenant, 'service_config.appointment_capacity', {})),
      addon: _get(tenant, 'service_config.addon', {}),
      food : _merge({
        charge_type      : null,
        charge_type_price: 0
      }, _get(tenant, 'service_config.food', {})),
      medication: _merge({
        charge_type: 'noCharge'
      }, _get(tenant, 'service_config.medication',{})),
      logo_file: _get(tenant, 'service_config.logo_file',{})
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
