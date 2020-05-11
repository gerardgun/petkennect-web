import { call, put, takeEvery } from 'redux-saga/effects'

import { Post, Put, reHydrateToken, reHydrateTenant as _reHydrateTenant } from '@lib/utils/http-client'

import authDuck from '@reducers/auth'

const { types } = authDuck

function* check() {
  try {
    yield put({ type: types.CHECK_PENDING })

    const token = localStorage.getItem('@token')
    const tenant = localStorage.getItem('@auth_tenant')

    if(token) reHydrateToken(token)
    if(tenant) _reHydrateTenant(tenant)

    yield put({
      type   : types.CHECK_FULFILLED,
      payload: {
        auth_status: token ? authDuck.statuses.EXISTS : authDuck.statuses.NOT_EXISTS,
        tenant     : tenant || ''
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
    const user = localStorage.getItem('@auth_user')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: JSON.parse(user)
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
    localStorage.removeItem('@auth_tenant')

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

    yield call(Put, 'auth/me', payload)

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

    const { token, is_staff, ...rest } = yield call(Post, 'login/', payload)
    const user = { ...rest, is_superadmin: is_staff }

    // Setting the token
    localStorage.setItem('@token', token)
    reHydrateToken(token)

    // BEGIN Delete
    // Setting the auth user data
    localStorage.setItem('@auth_user', JSON.stringify(user))
    // END Delete
    const is_employee_and_belong_one_company =  !user.is_superadmin && rest.companies.length === 1
    if(is_employee_and_belong_one_company)
      localStorage.setItem('@auth_tenant', rest.companies[0].subdomain_prefix)

    yield put({
      type   : types.SIGN_IN_FULFILLED,
      payload: {
        item       : user,
        auth_status: token ? authDuck.statuses.EXISTS : authDuck.statuses.NOT_EXISTS,
        tenant     : is_employee_and_belong_one_company ?  rest.companies[0].subdomain_prefix : ''
      }
    })
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
    localStorage.removeItem('@auth_tenant')

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
    yield put({ type: types.POST_PENDING })

    yield call(Post, 'reset-password/', payload)

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

function* requestPasswordReset({ payload }) {
  try {
    yield put({ type: types.PATCH_PENDING })

    yield call(Post, 'forgot-password/', payload)

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

function* rehydrateTenant({ payload }) {
  try {
    yield put({ type: types.REHYDRATE_TENANT_PENDING })

    localStorage.setItem('@auth_tenant', payload)

    _reHydrateTenant(payload)
    yield put({
      type   : types.REHYDRATE_TENANT_FULFILLED,
      payload: {
        tenant: payload
      }
    })
  } catch (e) {
    yield put({
      type : types.REHYDRATE_TENANT_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.CHECK, check),
  takeEvery(types.GET, get),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.RECOVER_ACCOUNT, recoverAccount),
  takeEvery(types.SIGN_IN, signIn),
  takeEvery(types.SIGN_OUT, signOut),
  takeEvery(types.PATCH, requestPasswordReset),
  takeEvery(types.REHYDRATE_TENANT, rehydrateTenant)
]
