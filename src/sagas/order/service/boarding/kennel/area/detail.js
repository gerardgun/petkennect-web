import { call, put, select, takeEvery } from 'redux-saga/effects'

import { booleanOptions } from '@lib/constants'
import { ChargeTypeOptions } from '@lib/constants/service'
import { Delete, Post, Patch } from '@lib/utils/http-client'
import * as locationSaga from '@sagas/location'
import * as petKindSaga from '@sagas/pet/kind'
import * as serviceGroupSaga from '@sagas/service/group'
import * as tenantDetailSaga from '@sagas/tenant/detail'

import kennelAreaDetailDuck from '@reducers/order/service/boarding/kennel/area/detail'
import locationDuck from '@reducers/location'
import petKindDuck from '@reducers/pet/kind'
import serviceGroupDuck from '@reducers/service/group'
import tenantDetailDuck from '@reducers/tenant/detail'

const { types } = kennelAreaDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })

    let locationList = yield select(locationDuck.selectors.list)
    let petKindList = yield select(petKindDuck.selectors.list)
    let serviceGroupList = yield select(serviceGroupDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    if(petKindList.items.length === 0) {
      yield* petKindSaga.get()

      petKindList = yield select(petKindDuck.selectors.list)
    }

    if(serviceGroupList.items.length === 0) {
      yield* serviceGroupSaga.get()

      serviceGroupList = yield select(serviceGroupDuck.selectors.list)
    }

    yield put({
      payload: {
        form: {
          location_options: locationList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          pet_kind_options: petKindList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          service_group_options: serviceGroupList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          is_surcharge_options: booleanOptions,
          charge_type_options : ChargeTypeOptions
        }
      },
      type: types.GET_FULFILLED
    })
  } catch (e) {
    yield put({
      error: e,
      type : types.GET_FAILURE
    })
  }
}

function* deleteItem({ ids: [ id ] }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `/orders-services-boardings-kennels-areas/${id}/`)

    const tenantDetail = yield select(tenantDetailDuck.selectors.detail)

    if(id in tenantDetail.item.service_config.kennel_areas)
      yield* tenantDetailSaga._put({
        payload: {
          service_config: {
            ...tenantDetail.item.service_config,
            kennel_areas: Object.entries(tenantDetail.item.service_config.kennel_areas)
              .filter(([ key ]) => parseInt(key) !== id)
              .reduce((obj, [ key, value ]) => ({ ...obj, [key]: value }), {})
          }
        }
      })

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, '/orders-services-boardings-kennels-areas/', payload)

    const tenantDetail = yield select(tenantDetailDuck.selectors.detail)

    yield* tenantDetailSaga._put({
      payload: {
        service_config: {
          ...tenantDetail.item.service_config,
          kennel_areas: {
            ...tenantDetail.item.service_config.kennel_areas,
            [result.id]: {
              service_group_ids: payload.service_group_ids,
              is_surcharge     : payload.is_surcharge,
              charge_type      : payload.charge_type,
              price            : parseFloat(payload.price)
            }
          }
        }
      }
    })

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

    yield call(Patch, `/orders-services-boardings-kennels-areas/${payload.id}/`, payload)

    const tenantDetail = yield select(tenantDetailDuck.selectors.detail)

    yield* tenantDetailSaga._put({
      payload: {
        service_config: {
          ...tenantDetail.item.service_config,
          kennel_areas: {
            ...tenantDetail.item.service_config.kennel_areas,
            [payload.id]: {
              service_group_ids: payload.service_group_ids,
              is_surcharge     : payload.is_surcharge,
              charge_type      : payload.charge_type,
              price            : parseFloat(payload.price)
            }
          }
        }
      }
    })

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.CREATE, create),
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
