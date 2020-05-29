import { call, put, takeEvery, select, all } from 'redux-saga/effects'

import serviceAddonGroupDuck from '@reducers/service/addon/group'
import serviceAddonGroupDetailDuck from '@reducers/service/addon/group/detail'

import { deleteItem as deleteAddonItem , _put as _putAddonItem } from '@sagas/service/addon/detail'

const { types: listTypes } = serviceAddonGroupDuck
const { types } = serviceAddonGroupDetailDuck

function* deleteItem({ ids: [ id ] }) {
  try {
    const { items = [] } = yield select(serviceAddonGroupDuck.selectors.list)

    const { item : {  addons } = {} } = yield select(serviceAddonGroupDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield all(addons.map(_addon =>
      call(deleteAddonItem,{ ids: [ _addon.id ] })
    ))
    yield put({
      type   : listTypes.UPDATE ,
      payload: items.filter(_item =>_item.id !== id)
    })

    yield put({ type: types.DELETE_FULFILLED })
  } catch (e) {
    yield put({
      type : types.DELETE_FAILURE,
      error: e
    })
  }
}

function* get({ id }) {
  /** unused */
  try {
    const { items = [] } = yield select(serviceAddonGroupDuck.selectors.list)
    /** only for demo v:, code innecesary */

    yield put({ type: types.GET_PENDING })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: items.find(_item=> _item.id === id)
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    const { items = [] } = yield select(serviceAddonGroupDuck.selectors.list)

    yield put({ type: types.POST_PENDING })

    yield put({
      type   : listTypes.UPDATE,
      payload: [ ...items, payload ]
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
    const { items = [] } = yield select(serviceAddonGroupDuck.selectors.list)

    const { item : { addons } = {} } = yield select(serviceAddonGroupDetailDuck.selectors.detail)

    yield put({ type: types.PUT_PENDING })

    yield all(addons.map(_addon =>
      call(_putAddonItem, { payload: { id: _addon.id, group_code: payload.name } })
    ))

    yield put({
      type   : listTypes.UPDATE,
      payload: items
        .map(_item=> _item.id === payload.id
          ? ({
            ..._item,
            id  : payload.name ,
            name: payload.name
            // addons: updateAddons
          })
          : _item)
    })

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
