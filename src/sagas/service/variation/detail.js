import moment from 'moment'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import _uniq from 'lodash/uniq'

import {
  ProtectedServiceType,
  VariationCheckoutChargeTypeOptions,
  VariationDurationTypeOptions,
  VariationTypeOptions
} from '@lib/constants/service'
import { Delete, Get, Post, Patch } from '@lib/utils/http-client'
import * as employeeScheduleSaga from '@sagas/employee/schedule'
import * as locationSaga from '@sagas/location'
import * as serviceGroupSaga from '@sagas/service/group'

import employeeScheduleDuck from '@reducers/employee/schedule'
import locationDuck from '@reducers/location'
import serviceVariationDetailDuck from '@reducers/service/variation/detail'
import serviceGroupDuck from '@reducers/service/group'

const { selectors, types } = serviceVariationDetailDuck

function* create() {
  try {
    yield put({ type: types.GET_PENDING })

    let employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    let serviceGroupList = yield select(serviceGroupDuck.selectors.list)

    if(employeeScheduleList.items.length === 0) {
      yield* employeeScheduleSaga.get()

      employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    }

    if(serviceGroupList.items.length === 0) {
      yield* serviceGroupSaga.get()

      serviceGroupList = yield select(serviceGroupDuck.selectors.list)
    }

    yield put({
      payload: {
        form: {
          employee_schedule_options: employeeScheduleList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          service_group_options: serviceGroupList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          type_options: VariationTypeOptions
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

function* createBoardingActivity() {
  try {
    yield put({ type: types.GET_PENDING })

    // BEGIN get boarding activity service
    const { results: services } = yield call(Get, 'services/', {
      service_group__type: 'B'
    })

    const boardingActivityService = services.find(({ type }) => type === 'B')
    // END get boarding activity service

    // BEGIN get service types
    const { results: serviceTypes } = yield call(Get, 'services/', {
      ordering : 'name',
      page_size: 100
    })
    // END get service types

    let employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)

    if(employeeScheduleList.items.length === 0) {
      yield* employeeScheduleSaga.get()

      employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    }

    yield put({
      payload: {
        form: {
          checkout_charge_type_options: VariationCheckoutChargeTypeOptions,
          employee_schedule_options   : employeeScheduleList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          service_group_name  : boardingActivityService.group.name,
          service_sku_id      : boardingActivityService.sku_id,
          service_type_options: serviceTypes
            .filter(({ type }) => !Object.keys(ProtectedServiceType).includes(type))
            .map(({ id, name }) => ({
              text : name,
              value: id
            })),
          type_options: VariationTypeOptions
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

function* createBoardingActivityGetReservations({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const detail = yield select(selectors.detail)

    const lists = yield all(payload.service_type_ids.map(serviceId =>
      call(Get, 'services-variations/', {
        service  : serviceId,
        page_size: 100
      })
    ))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          service_variation_options: [].concat(
            ...lists.map(({ results }) => results)
          )
            .map(({ id, name }) => ({
              text : name,
              value: id
            }))
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

function* createGetLocations({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const detail = yield select(selectors.detail)
    let locationList = yield select(locationDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    const selectedService = detail.form.service_type_options
      .find(({ value }) => value === payload.service_id)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          location_options: locationList.items
            .filter(({ id }) => selectedService.location_ids.includes(id))
            .map(({ id, name }) => ({
              text : name,
              value: id
            }))
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

function* createGetServiceTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const { results } = yield call(Get, 'services/', {
      ordering         : 'name',
      search           : payload.search,
      service_group__id: payload.service_group__id,
      page_size        : 10
    })

    const detail = yield select(selectors.detail)

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          service_type_options: results
            .filter(({ type }) => !Object.keys(ProtectedServiceType).includes(type))
            .map(({ id, name, locations }) => ({
              text        : name,
              value       : id,
              location_ids: locations
            }))
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

function* createGroupClass() {
  try {
    yield put({ type: types.GET_PENDING })

    // BEGIN get group class service
    const { results: services } = yield call(Get, 'services/', {
      service_group__type: 'T'
    })

    const groupClassService = services.find(({ type }) => type === 'G')
    // END get group class service

    let locationList = yield select(locationDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    yield put({
      payload: {
        form: {
          duration_type_options: VariationDurationTypeOptions,
          location_options     : locationList.items
            .filter(({ id }) => groupClassService.locations.includes(id))
            .map(({ id, name }) => ({
              text : name,
              value: id
            })),
          service_group_name: groupClassService.group.name,
          service_name      : groupClassService.name
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

function* deleteItem({ id, service_id }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `services/${service_id}/variations/${id}/`)

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* edit() {
  try {
    yield put({ type: types.GET_PENDING })

    const detail = yield select(selectors.detail)

    const service = yield call(Get, `services/${detail.item.service.id}/`)

    let employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    let locationList = yield select(locationDuck.selectors.list)

    if(employeeScheduleList.items.length === 0) {
      yield* employeeScheduleSaga.get()

      employeeScheduleList = yield select(employeeScheduleDuck.selectors.list)
    }

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          employee_schedule_options: employeeScheduleList.items.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          location_options: locationList.items
            .filter(({ id }) => service.locations.includes(id))
            .map(({ id, name }) => ({
              text : name,
              value: id
            })),
          type_options: VariationTypeOptions
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

function* editBoardingActivity() {
  try {
    yield put({ type: types.GET_PENDING })

    yield* createBoardingActivity()

    const detail = yield select(selectors.detail)

    // Loading default service types and reservation types
    const { results: serviceVariationAddons } = yield call(Get, `service-variations/${detail.item.id}/addons/`, {
      page_size: 100
    })

    const serviceIds = _uniq(serviceVariationAddons.map(item => item.service.id))

    const lists = yield all(serviceIds.map(serviceId =>
      call(Get, 'services-variations/', {
        service  : serviceId,
        page_size: 100
      })
    ))

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          ...detail.item,
          service_type_ids     : serviceIds,
          service_variation_ids: serviceVariationAddons.map(({ id }) => id)
        },
        form: {
          ...detail.form,
          service_variation_options: [].concat(
            ...lists.map(({ results }) => results)
          )
            .map(({ id, name }) => ({
              text : name,
              value: id
            }))
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

function* post({ payload: { service_id, price, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, `services/${service_id}/variations/`, payload)

    yield call(Post, `service-variations/${result.id}/prices/`, {
      ...price,
      started_at: moment(price.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
      ended_at  : moment(price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
    })

    yield put({
      type: types.POST_FULFILLED
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* postBoardingActivity({ payload: { price, service_variation_ids, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    // BEGIN get boarding activity service
    const { results: services } = yield call(Get, 'services/', {
      service_group__type: 'B'
    })

    const boardingActivityService = services.find(({ type }) => type === 'B')
    // END get boarding activity service

    let locationList = yield select(locationDuck.selectors.list)

    if(locationList.items.length === 0) {
      yield* locationSaga.get()

      locationList = yield select(locationDuck.selectors.list)
    }

    const result = yield call(Post, `services/${boardingActivityService.id}/variations/`, {
      ...payload,
      // BEGIN delete
      locations: locationList.items.map(({ id }) => id)
      // END delete
    })

    // Creating price
    yield call(Post, `service-variations/${result.id}/prices/`, {
      ...price,
      started_at: moment(price.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
      ended_at  : moment(price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
    })

    // Creating related service variation/reservation addons
    yield all(service_variation_ids.map(serviceVariationId =>
      call(Post, `service-variations/${result.id}/addons/`, {
        addon_service_variation: serviceVariationId
      })
    ))

    yield put({
      type: types.POST_FULFILLED
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* postGroupClass({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    // BEGIN get group class service
    const { results: services } = yield call(Get, 'services/', {
      service_group__type: 'T'
    })

    const groupClassService = services.find(({ type }) => type === 'G')
    // END get group class service

    yield call(Post, `services/${groupClassService.id}/variations/`, payload)

    yield put({
      type: types.POST_FULFILLED
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* postPrice({ payload: { service_variation_id, ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    yield call(Post, `service-variations/${service_variation_id}/prices/`, {
      ...payload,
      started_at: moment(payload.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
      ended_at  : moment(payload.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
    })

    yield put({
      type: types.POST_FULFILLED
    })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload: { id, service_id, price, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `services/${service_id}/variations/${id}/`, payload)

    if(price.id)
      yield call(Patch, `service-variations/${id}/prices/${price.id}/`, {
        ...price,
        started_at: moment(price.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
        ended_at  : moment(price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
      })
    else
      yield call(Post, `service-variations/${id}/prices/`, {
        ...price,
        started_at: moment(price.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
        ended_at  : moment(price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
      })

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* _putBoardingActivity({ payload: { id, service, price, service_variation_ids, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `services/${service.id}/variations/${id}/`, payload)

    // Creating/Updating price
    if(price.id)
      yield call(Patch, `service-variations/${id}/prices/${price.id}/`, {
        ...price,
        started_at: moment(price.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
        ended_at  : moment(price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
      })
    else
      yield call(Post, `service-variations/${id}/prices/`, {
        ...price,
        started_at: moment(price.started_at).format('YYYY-MM-DD[T]HH:mm:ss'),
        ended_at  : moment(price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
      })

    // Updating related service variation/reservation addons
    const { results: serviceVariationAddons } = yield call(Get, `service-variations/${id}/addons/`, {
      page_size: 100
    })

    const serviceVariationIdsToAdd = service_variation_ids
      .filter(serviceVariationId => !serviceVariationAddons.some(({ id }) => id === serviceVariationId))
    const serviceVariationIdsToDelete = serviceVariationAddons
      .filter(({ id }) => !service_variation_ids.some(serviceVariationId => serviceVariationId === id))

    if(serviceVariationIdsToAdd.length > 0)
      yield all(serviceVariationIdsToAdd.map(serviceVariationId =>
        call(Post, `service-variations/${id}/addons/`, {
          addon_service_variation: serviceVariationId
        })
      ))

    if(serviceVariationIdsToDelete.length > 0)
      yield all(serviceVariationIdsToDelete.map(serviceVariationId =>
        call(Delete, `service-variations/${id}/addons/${serviceVariationId}/`)
      ))

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* _putGroupClass({ payload: { id, service, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `services/${service.id}/variations/${id}/`, payload)

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
  takeEvery(types.CREATE_BOARDING_ACTIVITY, createBoardingActivity),
  takeEvery(types.CREATE_BOARDING_ACTIVITY_GET_RESERVATIONS, createBoardingActivityGetReservations),
  takeEvery(types.CREATE_GET_LOCATIONS, createGetLocations),
  takeEvery(types.CREATE_GET_SERVICE_TYPES, createGetServiceTypes),
  takeEvery(types.CREATE_GROUP_CLASS, createGroupClass),
  takeEvery(types.DELETE, deleteItem),
  takeEvery(types.EDIT, edit),
  takeEvery(types.EDIT_BOARDING_ACTIVITY, editBoardingActivity),
  takeEvery(types.POST, post),
  takeEvery(types.POST_BOARDING_ACTIVITY, postBoardingActivity),
  takeEvery(types.POST_GROUP_CLASS, postGroupClass),
  takeEvery(types.POST_PRICE, postPrice),
  takeEvery(types.PUT, _put),
  takeEvery(types.PUT_BOARDING_ACTIVITY, _putBoardingActivity),
  takeEvery(types.PUT_GROUP_CLASS, _putGroupClass)
]
