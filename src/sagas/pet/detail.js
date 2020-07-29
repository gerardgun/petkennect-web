
import { call, put, takeEvery, select } from 'redux-saga/effects'

import { Delete, Get, Post, Patch } from '@lib/utils/http-client'

import petDetailDuck from '@reducers/pet/detail'
import moment from 'moment'

const { types } = petDetailDuck

function* deleteItem(/* { ids } */) {
  try {
    const petDetail = yield select(petDetailDuck.selectors.detail)

    yield put({ type: types.DELETE_PENDING })

    yield call(Delete, `pets/${petDetail.item.id}/`)

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

    const item = yield call(Get, `pets/${id}/`)
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          ...item,
          vaccination_alert: item.vaccinations.filter((_vaccination)=> {
            return  moment(_vaccination.notified_at).add(30 ,'days').isSameOrAfter(moment())
          })
            .sort((_first, _second)=> (
              moment(_second.notified_at).format('YYYY-MM-DD-HH:mm:ss').localeCompare(moment(_first.notified_at).format('YYYY-MM-DD-HH:mm:ss'))
            ))
            .reduce((accumulator, currentValue, index, array) => {
              if(index == 0  || (index > 0 && array[index - 1].notified_at === currentValue.notified_at))
                return [ ...accumulator , currentValue ]

              return accumulator
            },[])
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

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, 'pets/', payload)

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

function* _put({ payload: { id, ...payload } }) {
  try {
    yield put({ type: types.PUT_PENDING })

    yield call(Patch, `pets/${id}/`, payload)

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
