import { call, put, select, takeEvery } from 'redux-saga/effects'

import boardingReservationDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'
import * as clientPetSaga from '@sagas/client/pet'
import clientPetDuck from '@reducers/client/pet'
import * as clientPetDetailSaga from '@sagas/pet/detail'
import petDetailDuck from '@reducers/pet/detail'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'
import { Get } from '@lib/utils/http-client'

const { types, selectors } = boardingReservationDetailDuck

function* create({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })
    const detail = yield select(selectors.detail)

    // locations
    // yield* locationSaga.get({payload: {service_group: payload.serviceGroup}})
    yield* locationSaga.get()
    const locationList = yield select(locationDuck.selectors.list)

    // pets
    let petOptions = []
    if(payload.pet) {
      yield* clientPetDetailSaga.get({ id: payload.pet })
      const detail = yield select(petDetailDuck.selectors.detail)
      petOptions.push(detail.item)
    }
    if(payload.client) {
      yield* clientPetSaga.get({
        payload: { client__id: payload.client, page_size: 100 }
      })
      const petsList = yield select(clientPetDuck.selectors.list)
      petOptions.push(...petsList.items)
    }

    yield put({
      payload: {
        form: {
          ...detail.form,
          pet_options     : petOptions,
          location_options: locationList.items.map((location) => {
            return { text: location.name, value: location.id }
          })
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

function* createGetServiceTypesByLocation({ payload }) {
  yield put({ type: types.GET_PENDING })

  const detail = yield select(selectors.detail)

  const serviceList = yield call(Get, 'services/', {
    location_id        : payload.location,
    service_group__type: payload.service_group__type
  })

  yield put({
    payload: {
      form: {
        ...detail.form,
        service_options: serviceList.map((service) => {
          return { text: service.name, value: service.id }
        })
      }
    },
    type: types.GET_FULFILLED
  })
}

function* createGetReservationTypesAndPackagesByService({ payload }) {
  yield put({ type: types.GET_PENDING })

  const detail = yield select(selectors.detail)

  const variationList = yield call(Get, 'services-variations/', {
    service: payload.service_id
  })
  yield put({
    payload: {
      form: {
        ...detail.form,
        reservation_type_options: variationList
          .filter(({ type }) => [ 'A', 'R' ].includes(type))
          .map((service) => {
            return { text: service.name, value: service.id }
          }),
        package_options: variationList
          .filter(({ type }) => [ 'P' ].includes(type))
          .map((packageItem) => {
            return {
              text             : packageItem.name,
              value            : packageItem.id,
              reservation_types: packageItem.service_variation_addons
            }
          })
      }
    },
    type: types.GET_FULFILLED
  })
}

export default [
  takeEvery(types.CREATE, create),
  takeEvery(
    types.CREATE_GET_SERVICES_TYPES_BY_LOCATION,
    createGetServiceTypesByLocation
  ),
  takeEvery(
    types.CREATE_GET_RESERVATION_TYPES_AND_PACKAGES_BY_SERVICE,
    createGetReservationTypesAndPackagesByService
  )
]
