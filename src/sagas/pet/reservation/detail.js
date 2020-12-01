import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'

import moment from 'moment'

const { types } = petReservationDetailDuck

function* deleteItem(/* { ids } */) {
  try {
    const petDetail = yield select(petDetailDuck.selectors.detail)
    const petResetvationDetail = yield select(petReservationDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pets/${petDetail.item.id}/reservations/${petResetvationDetail.item.id}/`)

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
    const petDetail = yield select(petDetailDuck.selectors.detail)

    const item = yield call(Get, `pets/${petDetail.item.id}/reservations/${id}/`)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload: { ...payload } }) {
  try {
    yield put({ type: types.POST_PENDING })

    let orderServices = []

    if(payload.pet && payload.serviceVariation)

      if(payload.serviceType === 'G')
        orderServices.push({
          service_variation: payload.serviceVariation.id,
          employee         : payload.currentTenant.id,
          price            : parseInt(payload.serviceVariation.price),
          reserved_at      : moment.utc(payload.check_in , 'YYYY-MM-DD HH-mm:ss Z'),
          location         : payload.location,
          pet              : payload.pet
        })
      else
        payload.pet && payload.pet.forEach(_pet => {
          orderServices.push({
            service_variation     : payload.serviceVariation.id,
            employee              : payload.currentTenant.id,
            price                 : parseInt(payload.serviceVariation.price),
            reserved_at           : moment.utc(payload.check_in , 'YYYY-MM-DD HH-mm:ss Z'),
            location              : payload.location,
            pet                   : _pet,
            belongings            : payload.belongings,
            medication_name       : payload.medication_name,
            medication_purpose    : payload.medication_purpose,
            medication_instruction: payload.medication_instruction,
            feeding               : payload.feeding
          })
        })

    const order = yield call(Post, 'orders/', {
      client  : payload.clientId,
      employee: payload.currentTenant.id,
      location: payload.location,
      services: orderServices
    })

    for (let _order_services of order.order_services)
    {
      const reservationDetail = {
        reserved_at           : moment.utc(payload.check_in , 'YYYY-MM-DD HH-mm:ss Z'),
        price                 : parseInt(payload.serviceVariation.price),
        employee              : payload.currentTenant.id,
        pet                   : _order_services.pet,
        location              : payload.location,
        parent_order_service  : _order_services.id,
        belongings            : payload.belongings,
        medication_name       : payload.medication_name,
        medication_purpose    : payload.medication_purpose,
        medication_instruction: payload.medication_instruction,
        feeding               : payload.feeding
      }

      if(payload.serviceType === 'G')
        yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,
          employee: payload.groomer
        })
      else if(payload.serviceType === 'D')
        yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  daycamp: {
          card       : '6',
          yard_type  : '11',
          checkout_at: moment.utc(payload.check_out , 'YYYY-MM-DD HH-mm:ss Z')
        } })
      else
        yield call(Patch, `reservations/${_order_services.id}/`,{ ...reservationDetail, boarding: {
          checkout_at: moment.utc(payload.check_out , 'YYYY-MM-DD HH-mm:ss Z'), kennel: payload.kennel_type
        } })
    }

    yield put({ type: types.POST_FULFILLED })
  } catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

function* _put({ payload : { ...payload } }) {
  try {
    const order = yield call(Patch, `orders/${payload.petReservationDetail.order}/`, {
      status  : 1,
      location: payload.location
    })

    for (let _order_services of order.order_services)
    {
      const reservationDetail = {
        reserved_at           : moment.utc(payload.check_in , 'YYYY-MM-DD HH-mm:ss Z'),
        price                 : parseInt(payload.serviceVariation.price),
        employee              : payload.currentTenant.id,
        pet                   : _order_services.pet,
        location              : payload.location,
        parent_order_service  : _order_services.id,
        belongings            : payload.belongings,
        medication_name       : payload.medication_name,
        medication_purpose    : payload.medication_purpose,
        medication_instruction: payload.medication_instruction,
        feeding               : payload.feeding
      }

      if(payload.serviceType === 'G')
        yield call(Patch, `reservations/${_order_services.id}/`, reservationDetail)
      else if(payload.serviceType === 'D')
        yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  daycamp: {
          card       : '6',
          yard_type  : '11',
          checkout_at: moment.utc(payload.check_out , 'YYYY-MM-DD HH-mm:ss Z')
        } })
      else
        yield call(Patch, `reservations/${_order_services.id}/`,{ ...reservationDetail, boarding: {
          checkout_at: moment.utc(payload.check_out , 'YYYY-MM-DD HH-mm:ss Z'), kennel: payload.kennel_type
        } })
    }
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
