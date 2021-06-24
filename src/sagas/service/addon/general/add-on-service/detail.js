import setupAddonServiceSettingDetailDuck from '@reducers/service/addon/general/add-on-service/detail'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'
import * as serviceGroupSaga from '@sagas/service/group'
import serviceGroupDuck from '@reducers/service/group'
import { Delete, Get, Patch, Post } from '@lib/utils/http-client'
import moment from 'moment'
import _uniqBy from 'lodash/uniqBy'

const { types, selectors } = setupAddonServiceSettingDetailDuck

function* create() {
  try {
    const detail = yield select(selectors.detail)
    // locations
    yield* locationSaga.get()
    const locationList = yield select(locationDuck.selectors.list)
    let locationOptions = locationList.items.map(({ id, name }) => ({
      text : name,
      value: id
    }))
    // service groups
    yield* serviceGroupSaga.get()
    const serviceGroupList = yield select(serviceGroupDuck.selectors.list)
    // calendars
    const calendarOptions = yield call(Get, 'employees-schedules/')

    // service type and reservation type options
    let serviceTypeOptions = []
    let reservationTypeOptions = []
    if(detail.item.id) {
      serviceTypeOptions = yield all(
        detail.item.service_groups.map((service_group) =>
          call(Get, 'services/', {
            ordering         : 'name',
            service_group__id: service_group,
            type             : 'C'
          })
        )
      )
      reservationTypeOptions = yield all(
        detail.item.service_types.map((service) =>
          call(Get, 'services-variations/', {
            ordering: 'name',
            service,
            type    : 'A,R'
          })
        )
      )
    }

    yield put({
      payload: {
        form: {
          ...detail.form,
          location_options      : locationOptions,
          location_total_options: locationOptions,
          service_group_options : serviceGroupList.items
            .filter(({ type }) => ![ 'S', 'A' ].includes(type))
            .map(({ id, name }) => ({
              text : name,
              value: id
            })),
          calendar_options: calendarOptions.map(({ id, name }) => ({
            text : name,
            value: id
          })),
          service_type_options: _uniqBy(
            [].concat(...serviceTypeOptions).map(({ id, name, service_group }) => ({
              text : name,
              value: id,
              service_group
            })),
            'value'
          ),
          true_addons_options: _uniqBy(
            [].concat(...reservationTypeOptions).map(
              ({ id, name, locations, service: { id: service_id } }) => ({
                text   : name,
                value  : id,
                service: service_id,
                locations
              })
            ),
            'value'
          )
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

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const addon = yield call(Post, 'services-true-addons/', {
      ...payload,
      is_group_play_required: false
    })

    // create price
    yield call(Post, `service-variations/${addon.id}/prices/`, {
      ...payload.price,
      started_at: moment(payload.price.started_at).format(
        'YYYY-MM-DD[T]HH:mm:ss'
      ),
      ended_at: moment(payload.price.ended_at).format('YYYY-MM-DD[T]HH:mm:ss')
    })

    yield put({
      type: types.POST_FULFILLED,
      payload
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
    yield put({ type: types.POST_PENDING })

    delete payload.service
    const addon = yield call(Patch, `services-true-addons/${payload.id}`, {
      ...payload,
      service_true_addon: {
        service_variations: payload.service_true_addon.service_variations,
        color_code        : payload.service_true_addon.color_code
      }
    })

    // update price
    yield call(
      Patch,
      `service-variations/${addon.id}/prices/${payload.price.id}`,
      {
        ...payload.price,
        started_at: moment(payload.price.started_at).format(
          'YYYY-MM-DD[T]HH:mm:ss'
        ),
        ended_at: moment(payload.price.ended_at).format(
          'YYYY-MM-DD[T]HH:mm:ss'
        )
      }
    )

    yield put({
      type: types.PUT_FULFILLED,
      payload
    })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* _delete({ payload }) {
  try {
    yield put({ type: types.DELETE_PENDING })

    yield call(
      Delete,
      `services/${payload.service.id}/variations/${payload.id}/`
    )

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* getServiceTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    const results = yield call(Get, 'services/', {
      ordering         : 'name',
      service_group__id:
        payload.service_group__ids[payload.service_group__ids.length - 1],
      type: 'C'
    })
    const serviceOptions = results.map(({ id, name, service_group }) => ({
      text : name,
      value: id,
      service_group
    }))

    const detail = yield select(selectors.detail)
    const uniqOptions = _uniqBy(
      [ ...detail.form.service_type_options, ...serviceOptions ],
      'value'
    )

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          service_type_options: uniqOptions.filter(({ service_group }) =>
            payload.service_group__ids.includes(service_group)
          )
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

function* getReservationTypes({ payload }) {
  try {
    yield put({ type: types.GET_PENDING })

    // get reservation types options
    const results = yield call(Get, 'services-variations/', {
      ordering: 'name',
      service : payload.services[payload.services.length - 1],
      type    : 'A,R'
    })

    const reservationOptions = results.map(
      ({ id, name, locations, service: { id: service_id } }) => ({
        text   : name,
        value  : id,
        service: service_id,
        locations
      })
    )

    const detail = yield select(selectors.detail)
    const uniqOptions = _uniqBy(
      [ ...detail.form.true_addons_options, ...reservationOptions ],
      'value'
    )

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        form: {
          ...detail.form,
          true_addons_options: uniqOptions.filter(({ service }) =>
            payload.services.includes(service)
          )
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

function* postPrice({ payload: { service_variation_id, ...payload } }) {
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

export default [
  takeEvery(types.CREATE, create),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.DELETE, _delete),
  takeEvery(types.POST_PRICE, postPrice),
  takeEvery(types.GET_SERVICE_TYPES, getServiceTypes),
  takeEvery(types.GET_RESERVATION_TYPES, getReservationTypes)
]
