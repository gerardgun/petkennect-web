import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get,Post, Patch } from '@lib/utils/http-client'

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
    // if service type is training and grooming
    let gOneDayReservation = false
    if(payload.serviceType === 'T' || payload.serviceType === 'G')
      gOneDayReservation = true

    // if only endDate fill
    let dfEndDate = new Date(payload.check_out)

    // for frequency
    let weekValue = 0
    if(payload.frequency === 'every_other_week')
      weekValue = 2
    else
      weekValue = 1

    // if until no of occurrences
    if(payload.until_no_of_occurrences) {
      dfEndDate = new Date(payload.check_in)
      dfEndDate = new Date(dfEndDate.setDate((dfEndDate.getDate() + ((7 * payload.until_no_of_occurrences * weekValue) - 1))))
    }
    else {
      dfEndDate = new Date(dfEndDate.setDate((dfEndDate.getDate() *  weekValue)))
    }

    let weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
    let reservationDateArr = []
    let gEndDate
    let gStartDate
    let dayAvailableFlag = false
    let weekCount = 1
    let cycleCount = 0
    let startDate = new Date(payload.check_in)
    let startDateDay = startDate.getDay()

    for (let d = new Date(payload.check_in); d <=  dfEndDate; d.setDate(d.getDate() + 1)) {
      let currentDay = d.getDay()

      if(cycleCount == 0) {
        // if(currentDay + 1 == 2)
        if(currentDay == startDateDay)
          cycleCount++
      }
      else
      if(currentDay + 1 == 2)
      {weekCount++}

      // for if isEveryOtherWeek is Clicked
      let isEveryOtherWeek = true
      if(weekValue == 2 && weekCount % 2 == 0)
        isEveryOtherWeek = false

      // if one day reservation than checkin and checkout is same day
      if(gOneDayReservation) {
        if(payload.allSelectedWeek.includes('' + weekday[currentDay] + '') && isEveryOtherWeek)
          reservationDateArr.push({ startDate: moment(d).format('YYYY-MM-DD'), endDate: moment(d).format('YYYY-MM-DD') })
      }
      else
      // for set condition based reservation start date and end date
      if(payload.allSelectedWeek.includes('' + weekday[currentDay] + '') && isEveryOtherWeek) {
        if(!dayAvailableFlag)
          gStartDate = moment(d).format('YYYY-MM-DD')

        dayAvailableFlag = true
      }
      else {
        if(dayAvailableFlag)
          reservationDateArr.push({ startDate: gStartDate, endDate: gEndDate })

        dayAvailableFlag = false
      }

      gEndDate = moment(d).format('YYYY-MM-DD')
    }

    // if last day was not in array
    if(dayAvailableFlag)
      reservationDateArr.push({ startDate: gStartDate, endDate: gEndDate })

    // if not any day selcted
    if(reservationDateArr.length == 0)
      reservationDateArr.push({ startDate: payload.check_in , endDate: moment(dfEndDate).format('YYYY-MM-DD')  })

    for (let item of reservationDateArr)
    {
      yield put({ type: types.POST_PENDING })
      let orderServices = []
      if(payload.pet && payload.serviceVariations)

        if(payload.serviceType === 'G')
          orderServices.push({
            service_variation: payload.serviceVariations.id,
            employee         : payload.currentTenant.id,
            price            : parseInt(payload.serviceVariations.price),
            reserved_at      : moment.utc(item.startDate + ' ' + payload.check_in_time , 'YYYY-MM-DD HH-mm:ss Z'),
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
              reserved_at           : moment.utc(item.startDate + ' ' + payload.check_in_time , 'YYYY-MM-DD HH-mm:ss Z'),
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
          reserved_at           : moment.utc(item.startDate + ' ' + payload.check_in_time , 'YYYY-MM-DD HH-mm:ss Z'),
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
          yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  daycamp: {
            card       : '6',
            yard_type  : payload.yard,
            checkout_at: moment.utc(item.endDate, 'YYYY-MM-DD HH-mm:ss Z')
          } })
        }
        else if(payload.serviceType === 'T') {
          yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  training: {
            method       : payload.method,
            comment      : payload.comment,
            contracted_at: moment.utc(item.startDate + ' ' + payload.check_in_time , 'YYYY-MM-DD HH-mm:ss Z')
          } })
        }
        else
        {
          yield call(Patch, `reservations/${_order_services.id}/`,{ ...reservationDetail, boarding: {
            checkout_at: moment.utc(item.endDate , 'YYYY-MM-DD HH-mm:ss Z'), kennel: payload.kennel_type
          } })
        }
      }

      yield put({ type: types.POST_FULFILLED })
    }
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
        price                 : parseInt(payload.serviceVariations.price),
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
