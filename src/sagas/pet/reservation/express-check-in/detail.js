import { call, put, takeEvery } from 'redux-saga/effects'

import { Post, Patch } from '@lib/utils/http-client'

import petReservationCheckInDetailDuck from '@reducers/pet/reservation/express-check-in/detail'

import moment from 'moment'

const { types } = petReservationCheckInDetailDuck

function* post({ payload: { ...payload } }) {
  try {
    let startDate = new Date()
    yield put({ type: types.POST_PENDING })
    let orderServices = []
    payload.serviceVariations && payload.serviceVariations.map(_pet => {
      orderServices.push({
        service_variation     : _pet.id,
        employee              : payload.currentTenant.id,
        price                 : parseInt(_pet.price),
        reserved_at           : moment.utc(startDate , 'YYYY-MM-DD HH-mm:ss Z'),
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
        reserved_at           : moment.utc(startDate, 'YYYY-MM-DD HH-mm:ss Z'),
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

      if(payload.service_type === 'T')
        yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  training: {
          method       : payload.method,
          comment      : payload.comment,
          contracted_at: moment.utc(startDate , 'YYYY-MM-DD HH-mm:ss Z')
        } })

      else if(payload.service_type === 'F' || payload.service_type === 'D')
        yield call(Patch, `reservations/${_order_services.id}/`, { ...reservationDetail,  daycamp: {
          card       : '6',
          yard_type  : payload.yard,
          checkout_at: moment.utc(startDate, 'YYYY-MM-DD HH-mm:ss Z')
        } })
    }
    yield put({ type: types.POST_FULFILLED })
  }

  catch (e) {
    yield put({
      type : types.POST_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.POST, post)
]
