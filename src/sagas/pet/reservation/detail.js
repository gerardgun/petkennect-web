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
    let checkInTime = payload.check_in_time

    let reservationDateArr = payload.reservationDate

    // if not any day selcted
    if(payload.serviceType == 'B')
      reservationDateArr = [].concat(moment(payload.check_in  + ' ' + payload.check_in_time))

    for (let reservationDate of reservationDateArr) {
      let reserveDate = moment(reservationDate).format('YYYY-MM-DD')
      let reservation_at =  moment.utc(reserveDate  + ' ' + checkInTime, 'YYYY-MM-DD HH-mm:ss Z')

      yield put({ type: types.POST_PENDING })
      let orderServices = []
      if(payload.pet && payload.serviceVariations)

        if(payload.serviceType === 'G')
          orderServices.push({
            service_variation: payload.serviceVariations.id,
            employee         : payload.currentTenant.id,
            price            : parseInt(payload.serviceVariations.price),
            reserved_at      : reservation_at,
            location         : payload.location,
            pet              : payload.pet,
            comment          : payload.comment
          })
        else
          payload.serviceVariations && payload.serviceVariations.forEach(_pet => {
            orderServices.push({
              service_variation     : _pet.id,
              employee              : payload.currentTenant.id,
              price                 : parseInt(_pet.price),
              reserved_at           : reservation_at,
              location              : payload.location,
              pet                   : _pet.petId,
              belongings            : payload.belongings,
              medication_name       : payload.medication_name,
              medication_purpose    : payload.medication_purpose,
              medication_instruction: payload.medication_instruction,
              feeding               : payload.feeding,
              comment               : payload.comment
            })
          })

      const order = yield call(Post, 'orders/', {
        client  : payload.clientId,
        employee: payload.currentTenant.id,
        location: payload.currentTenant.employee.location,
        services: orderServices
      })

      for (let _order_services of order.order_services)
      {
        const reservationDetail = {
          reserved_at           : _order_services.reserved_at,
          price                 : parseInt(_order_services.price),
          employee              : payload.currentTenant.id,
          pet                   : _order_services.pet,
          location              : payload.location,
          parent_order_service  : _order_services.id,
          belongings            : payload.belongings,
          medication_name       : payload.medication_name,
          medication_purpose    : payload.medication_purpose,
          medication_instruction: payload.medication_instruction,
          feeding               : payload.feeding,
          comment               : payload.comment
        }

        if(payload.serviceType === 'G')
        {
          if(payload.grooming_service_list)
            for (let item of payload.grooming_service_list)
              yield call(Post, `reservations/${_order_services.id}/addons/`, {
                service_variation: item.id,
                price            : item.price
              })

          yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,
            employee: payload.groomer
          })
        }
        else if(payload.serviceType === 'F' || payload.serviceType === 'D')
        {
          if(payload.daycamp_reservation_list)
            for (let items of payload.daycamp_reservation_list)
              for (let item of items.subVariation)
                if(item.petId === reservationDetail.pet)
                  yield call(Post, `reservations/${_order_services.id}/addons/`, {
                    service_variation: item.id,
                    price            : item.price
                  })
          for (let item of payload.yardDetail)
            if(item.petId === reservationDetail.pet)
              yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  daycamp: {
                card       : '6',
                yard_type  : item.yard,
                type       : item.type,
                // checkout_at: moment.utc(reserveDate  + ' ' + checkOutTime, 'YYYY-MM-DD HH-mm:ss Z') // comment for checkout is not required in post
                checkout_at: moment.utc(reserveDate, 'YYYY-MM-DD HH-mm:ss Z')
              }
              }
              )
        }
        else if(payload.serviceType === 'T') {
          yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  training: {
            method       : payload.method,
            comment      : payload.comment,
            contracted_at: reservation_at
          } })
        }
        else if(payload.serviceType === 'B')
        {
          if(payload.boarding_reservation_list)
            for (let items of payload.boarding_reservation_list)
              for (let item of items.subVariation)
                if(item.petId === reservationDetail.pet)
                  yield call(Post, `reservations/${_order_services.id}/addons/`, {
                    service_variation: item.id,
                    price            : item.price
                  })
          yield call(Patch, `reservations/${_order_services.id}/`,{ ...reservationDetail, boarding: {
            checkout_at: moment.utc(moment(payload.check_out  + ' ' + payload.check_out_time), 'YYYY-MM-DD HH-mm:ss Z'), kennel: payload.kennel_type
          } })
        }
      }
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
    let checkIn = payload.check_in
    let checkInTime = payload.check_in_time
    let checkOutTime = payload.check_out_time
    let reservation_at =  moment.utc(checkIn  + ' ' + checkInTime, 'YYYY-MM-DD HH-mm:ss Z')

    let petId = payload.serviceType === 'G' ? payload.pet : payload.pet[0]
    for (let _order_services of order.order_services.filter(_ => _.pet === petId))
    {
      const reservationDetail = {
        reserved_at           : reservation_at,
        comment               : payload.comment,
        price                 : parseInt(_order_services.price),
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

      if(payload.serviceType === 'B') {
        if(payload.boarding_reservation_list || payload.addons) {
          for (let item of payload.addons) {
            let value =  payload.boarding_reservation_list.map((it)=> it.subVariation).map(
              (ite)=> ite[0]).find(__ => __.id === item.service_variation)

            if(value === undefined)
              yield call(Delete, `reservations/${_order_services.id}/addons/${item.id}/`, {
                service_addon_ids: [ item.id ]
              })
          }

          for (let item of payload.boarding_reservation_list)
            for (let subItem of item.subVariation) {
              let value = payload.addons.find(_item=> subItem.id === _item.service_variation)
              if(value !== undefined)
                yield call(Patch, `reservations/${_order_services.id}/addons/${value.id}/`, {
                  comment: payload.comment,
                  price  : subItem.price
                })
              else
                yield call(Post, `reservations/${_order_services.id}/addons/`, {
                  service_variation: subItem.id,
                  price            : subItem.price
                })
            }
        }

        yield call(Patch, `reservations/${_order_services.id}/`,{ ...reservationDetail, boarding: {
          checkout_at: moment.utc(moment(payload.check_out  + ' ' + payload.check_out_time), 'YYYY-MM-DD HH-mm:ss Z'), kennel: payload.kennel_type
        } })
      }
      else if(payload.serviceType === 'G')
      {
        if(payload.grooming_service_list || payload.addons)
          for (let item of payload.addons) {
            let value =  payload.grooming_service_list.find(_item => _item.id === item.service_variation)
            if(value === undefined)

              yield call(Delete, `reservations/${_order_services.id}/addons/${item.id}/`, {
                service_addon_ids: [ item.id ]

              })
          }

        for (let item of payload.grooming_service_list) {
          let  value = payload.addons.find(_item=> item.id === _item.service_variation)
          if(value !== undefined)
            yield call(Patch, `reservations/${_order_services.id}/addons/${value.id}/`, {
              comment: payload.comment,
              price  : item.price
            })

          else

            yield call(Post, `reservations/${_order_services.id}/addons/`, {
              service_variation: item.id,
              price            : item.price
            })
        }

        yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,
          employee: payload.groomer
        })
      }
      else if(payload.serviceType === 'T') {
        yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  training: {
          method       : payload.method,
          comment      : payload.comment,
          contracted_at: reservation_at
        } })
      }
      else if(payload.serviceType === 'D' || payload.serviceType === 'F')
      {
        if(payload.daycamp_reservation_list || payload.addons)
          for (let item of payload.addons) {
            let value = payload.daycamp_reservation_list.map((items) => items.subVariation).map((data) =>
              data[0]).find(__ => __.id === item.service_variation)
            if(value === undefined)
              yield call(Delete, `reservations/${_order_services.id}/addons/${item.id}/`, {
                service_addon_ids: [ item.id ]
              })
          }
        for (let items of payload.daycamp_reservation_list)
          for (let item of items.subVariation) {
            let  value = payload.addons.find(_item=> _item.service_variation === item.id)
            if(value !== undefined)
              yield call(Patch, `reservations/${_order_services.id}/addons/${value.id}/`, {
                price: item.price
              })
            else
              yield call(Post, `reservations/${_order_services.id}/addons/`, {
                service_variation: item.id,
                price            : item.price
              })
          }

        for (let item of payload.yardDetail)
          if(item.petId === reservationDetail.pet)
            yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  daycamp: {
              card       : '6',
              yard_type  : item.yard,
              type       : item.type,
              checkout_at: moment.utc(checkIn  + ' ' + checkOutTime, 'YYYY-MM-DD HH-mm:ss Z')
            } }
            )
      }
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
