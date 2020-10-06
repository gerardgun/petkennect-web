import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Post, Patch } from '@lib/utils/http-client'

import customizedFieldDetailDuck from '@reducers/customized-field/field/detail'

const { types } = customizedFieldDetailDuck

function* deleteItem() {
  try {
    yield put({ type: types.DELETE_PENDING })
    const  customizedFieldDetail = yield select(customizedFieldDetailDuck.selectors.detail)
    yield call(Delete, `eav-entities/${customizedFieldDetail.item.entity}/attributes/${customizedFieldDetail.item.id}`)

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

    const result = yield call(Post, `eav-entities/${payload.eav_entity_id}/attributes/`, {
      name                   : payload.name,
      entity_group           : payload.entity_group,
      display_name           : payload.display_name,
      display_type           : payload.display_type,
      is_required            : payload.is_required == true ? true : false,
      is_editable_by_client  : payload.is_editable_by_client == true ? true : false,
      is_visible_by_client   : payload.is_visible_by_client == true ? true : false,
      is_editable_by_employee: payload.is_editable_by_employee == true ? true : false
    })

    const selectedValue = payload.values
    if(selectedValue != null)
      for (let item of selectedValue)
        yield call(Post, `eav-attributes/${result.id}/values/`, item)

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

    const result = yield call(Patch, `eav-entities/${payload.entity}/attributes/${payload.id}/`, {
      name                   : payload.name,
      group_name             : payload.group_name,
      entity_group           : payload.entity_group,
      display_name           : payload.display_name,
      display_type           : payload.display_type,
      is_required            : payload.is_required == true ? true : false,
      is_editable_by_client  : payload.is_editable_by_client == true ? true : false,
      is_visible_by_client   : payload.is_visible_by_client == true ? true : false,
      is_editable_by_employee: payload.is_editable_by_employee == true ? true : false,
      order                  : payload.order
    })

    const selectedValue = payload.values

    for (let item of result.values)
      yield call(Delete, `eav-attributes/${result.id}/values/${item.id}`)

    for (let item of selectedValue)
      if(item.id)
        yield call(Patch, `eav-attributes/${result.id}/values/${item.id}/`, item)
      else
        yield call(Post, `eav-attributes/${result.id}/values/`, item)

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
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put)
]
