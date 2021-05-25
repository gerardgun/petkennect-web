import { getLocation } from 'connected-react-router'
import { call, fork, put, select, take, takeEvery } from 'redux-saga/effects'

import { Get, Patch, Post, Put, reHydrateToken, reHydrateTenant as _reHydrateTenant } from '@lib/utils/http-client'
import * as tenantDetailSaga from '@sagas/tenant/detail'
import * as petSaga from '@sagas/pet'

import authDuck from '@reducers/auth'
import locationDuck from '@reducers/location'

const { selectors, types } = authDuck

function* check() {
  try {
    yield put({ type: types.CHECK_PENDING })

    const token = localStorage.getItem('@token')
    const tenant = localStorage.getItem('@auth_tenant')

    if(token) {
      // Get session user data if token exists
      reHydrateToken(token)
      _reHydrateTenant(tenant)

      yield* get()
      yield* tenantDetailSaga.get()
    }

    // Get authenticated user data
    const authDetail = yield select(selectors.detail)

    let sessionExists = Boolean(authDetail.item.id)

    if(sessionExists) {
      yield put({
        type   : types.CHECK_FULFILLED,
        payload: {
          session_status: authDuck.statuses.EXISTS,
          tenant        : tenant
        }
      })

      {/* BEGIN Delete */}
      yield put({
        type: locationDuck.types.GET
      })
      {/* END Delete */}
    } else {
      yield* signOut() // Remove local storage variables and rehydrate request

      yield put({
        type   : types.CHECK_FULFILLED,
        payload: {
          session_status: authDuck.statuses.NOT_EXISTS,
          tenant        : ''
        }
      })
    }
  } catch (e) {
    yield put({
      type   : types.CHECK_FAILURE,
      error  : e,
      payload: {
        session_status: authDuck.statuses.NOT_EXISTS
      }
    })
  }
}

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    // Recover authenticated user data
    const { is_staff, ...me } = yield call(Get, 'get_my_info/')

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        item: {
          ...me,
          is_superadmin: is_staff
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

function* patch({ payload }) {
  try {
    yield put({ type: types.PATCH_PENDING })

    yield call(Patch, 'auth/me/', payload)

    yield put({ type: types.PATCH_FULFILLED })
  } catch (e) {
    yield put({
      type : types.PATCH_FAILURE,
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

    const { token } = yield call(Post, 'login/', payload)

    // Setting the token
    localStorage.setItem('@token', token)
    reHydrateToken(token)

    yield* get()

    const { item: authUser } = yield select(selectors.detail)

    const is_employee_and_belong_one_company = !authUser.is_superadmin && authUser.companies.length === 1

    if(is_employee_and_belong_one_company)
      localStorage.setItem('@auth_tenant', authUser.companies[0].subdomain_prefix)

    yield put({
      type   : types.SIGN_IN_FULFILLED,
      payload: {
        session_status: token ? authDuck.statuses.EXISTS : authDuck.statuses.NOT_EXISTS,
        tenant        : is_employee_and_belong_one_company ?  authUser.companies[0].subdomain_prefix : ''
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
    _reHydrateTenant()

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

function* rehydrateTenant({ payload: tenant }) {
  try {
    yield put({ type: types.REHYDRATE_TENANT_PENDING })

    localStorage.setItem('@auth_tenant', tenant)

    _reHydrateTenant(tenant)
    yield* tenantDetailSaga.get()

    yield put({
      type   : types.REHYDRATE_TENANT_FULFILLED,
      payload: {
        tenant
      }
    })

    {/* BEGIN Delete */}
    yield put({
      type: locationDuck.types.GET
    })
    {/* END Delete */}
  } catch (e) {
    yield put({
      type : types.REHYDRATE_TENANT_FAILURE,
      error: e
    })
  }
}

// How to get previous state from sagas, sample in the following link
// https://github.com/redux-saga/redux-saga/blob/master/examples/async/src/sagas/index.js#L31
// https://github.com/redux-saga/redux-saga/issues/538
function* nextLocationChange() {
  while (true) {
    const prevAuthDetail = yield select(selectors.detail)

    yield take(types.SET)

    const newAuthDetail = yield select(selectors.detail)
    const location = yield select(getLocation)

    if(prevAuthDetail.location !== newAuthDetail.location)
      if(location.pathname === '/pet') {
        yield fork(petSaga.get)
      }
  }
}

export default [
  takeEvery(types.GET, get),
  takeEvery(types.PATCH, patch),
  takeEvery(types.POST, post),
  takeEvery(types.PUT, _put),
  takeEvery(types.CHECK, check),
  takeEvery(types.RECOVER_ACCOUNT, recoverAccount),
  takeEvery(types.SIGN_IN, signIn),
  takeEvery(types.SIGN_OUT, signOut),
  takeEvery(types.PATCH_PASSWORD, requestPasswordReset),
  takeEvery(types.REHYDRATE_TENANT, rehydrateTenant),
  fork(nextLocationChange)
]
