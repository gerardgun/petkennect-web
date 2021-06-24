import setupOpenLineAddonServiceSettingDetailDuck from '@reducers/service/addon/general/open-line-service/detail'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import * as locationSaga from '@sagas/location'
import locationDuck from '@reducers/location'
import { Delete, Patch, Post } from '@lib/utils/http-client'

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

    yield call(Post, 'services-open-line-addons/', {
      ...payload,
      is_group_play_required: false
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
    yield call(Patch, `services-open-line-addons/${payload.id}`, {
      ...payload,
      service_open_line_addon: {
        can_be_credit_negative: payload.service_open_line_addon.can_be_credit_negative,
        is_tip                : payload.service_open_line_addon.is_tip
      }
    })

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

export default [
  takeEvery(types.CREATE, create),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.DELETE, _delete)
]
