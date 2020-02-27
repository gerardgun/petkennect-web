import { call, put, select, takeEvery } from 'redux-saga/effects'

import { Post, Put, Get, reHydrateToken } from '@lib/utils/http-client'

import authDuck from '@reducers/auth'

const { types, selectors } = authDuck

function* check() {
  try {
    yield put({ type: types.CHECK_PENDING })

    const token = localStorage.getItem('@token')

    if(token) reHydrateToken(token)

    yield put({
      type   : types.CHECK_FULFILLED,
      payload: {
        auth_status: token ? authDuck.statuses.EXISTS : authDuck.statuses.NOT_EXISTS
      }
    })
  } catch (e) {
    yield put({
      type   : types.CHECK_FAILURE,
      error  : e,
      payload: {
        auth_status: authDuck.statuses.NOT_EXISTS
      }
    })
  }
}

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    /* BEGIN Delete */
    yield call(() => new Promise(resolve => setTimeout(resolve, 500)))
    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          id: 123,
          name: 'Tester',
          lastname: 'Lastname',
          email: 'tester@petkennect.com'
        }
      }
    })
    /* END Delete */

    // const me = yield call(Get, 'auth/me')

    // yield put({
    //   type   : types.GET_FULFILLED,
    //   payload: {
    //     item: me
    //   }
    // })
  } catch (e) {
    localStorage.removeItem('@token')

    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

function* post({ payload }) {
  try {
    yield put({ type: types.POST_PENDING })

    const result = yield call(Post, 'auth/sign-up', payload)

    if(typeof result === 'object' && result.success === false) {
      const e = new Error(result.message)

      e.response = { data: result }

      throw e
    }

    yield put({ type: types.POST_FULFILLED })
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

    const result = yield call(Put, 'auth/me', payload)

    yield put({ type: types.PUT_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PUT_FAILURE,
      error: e
    })
  }
}

function* signIn({ payload }) {
  try {
    yield put({ type: types.SIGN_IN_PENDING })

    /* BEGIN Delete */
    yield call(() => new Promise(resolve => setTimeout(resolve, 2000)))
    localStorage.setItem('@token', 'fake-token')
    reHydrateToken('fake-token')
    /* END Delete */

    // const result = yield call(Post, 'auth/sign-in', payload)

    // localStorage.setItem('@token', result.token)

    // reHydrateToken(result.token)

    yield put({ type: types.SIGN_IN_FULFILLED })
  } catch (e) {
    yield put({
      type : types.SIGN_IN_FAILURE,
      error: e
    })
  }
}

function* signOut() {
  try {
    yield put({ type: types.SIGN_OUT_PENDING })

    localStorage.removeItem('@token')

    // Reset main reducers
    yield put({
      type: types.RESET
    })

    reHydrateToken()

    yield put({
      type: types.SIGN_OUT_FULFILLED
    })
  } catch (e) {
    yield put({
      type : types.SIGN_OUT_FAILURE,
      error: e
    })
  }
}

function* recoverAccount({ payload }) {
  try {
    yield put({ type: types.PATCH_PENDING })

    const result = yield call(Post, 'auth/recover-account', payload)

    yield put({
      type: types.PATCH_FULFILLED
    })
  } catch (e) {
    yield put({
      type : types.PATCH_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.CHECK, check),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.SIGN_IN, signIn),
  takeEvery(types.SIGN_OUT, signOut),
  takeEvery(types.PATCH, recoverAccount)
]
