import setupOpenLineAddonServiceSettingDetailDuck from '@reducers/service/addon/general/open-line-service/detail'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'
import { Delete, Patch, Post } from '@lib/utils/http-client'
import moment from 'moment'

const { types, selectors } = setupOpenLineAddonServiceSettingDetailDuck

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

    yield put({
      payload: {
        form: {
          ...detail.form,
          location_options: locationOptions
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

    const openLine = yield call(Post, 'services-open-line-addons/', {
      ...payload,
      is_group_play_required: false
    })

    // create price
    yield call(Post, `service-variations/${openLine.id}/prices/`, {
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
    yield put({ type: types.PUT_PENDING })

    delete payload.service
    const addon = yield call(Patch, `services-open-line-addons/${payload.id}`, {
      ...payload,
      service_open_line_addon: {
        can_be_credit_negative: payload.service_open_line_addon.can_be_credit_negative,
        is_tip                : payload.service_open_line_addon.is_tip
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
  takeEvery(types.POST_PRICE, postPrice)
]
