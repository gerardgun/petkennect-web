import produce from 'immer'
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'auth',
  initialState: {
    auth_status: 'NOT_EXISTS'
  }
})
  .extend(detail)
  .extend({
    consts: {
      statuses: [
        'CHECKING', 'CHECKED', 'EXISTS', 'NOT_EXISTS',
        'SIGNING_OUT', 'SIGNED_OUT',
        'SIGNING_IN', 'SIGNED_IN'
      ]
    },
    types: [
      'CHECK',
      'CHECK_CANCEL',
      'CHECK_FAILURE',
      'CHECK_FULFILLED',
      'CHECK_PENDING',
      'RECOVER_ACCOUNT',
      'SIGN_IN',
      'SIGN_IN_CANCEL',
      'SIGN_IN_FAILURE',
      'SIGN_IN_FULFILLED',
      'SIGN_IN_PENDING',
      'SIGN_OUT',
      'SIGN_OUT_CANCEL',
      'SIGN_OUT_FAILURE',
      'SIGN_OUT_FULFILLED',
      'SIGN_OUT_PENDING'
    ],
    reducer: (state, action, { types, statuses }) => produce(state, draft => {
      switch (action.type) {
        case types.CHECK_CANCEL:
        case types.SIGN_IN_CANCEL:
        case types.SIGN_OUT_CANCEL:
          draft.status = statuses.CANCELED

          return
        case types.CHECK_FAILURE:
        case types.SIGN_IN_FAILURE:
        case types.SIGN_OUT_FAILURE:
          for (let key in action.payload) draft[key] = action.payload[key]

          draft.status = statuses.ERROR
          draft.error = action.error

          return
        case types.CHECK_FULFILLED:
          for (let key in action.payload) draft[key] = action.payload[key]

          draft.status = statuses.CHECKED

          return
        case types.CHECK_PENDING:
          draft.status = statuses.CHECKING

          return
        case types.SIGN_IN_FULFILLED:
          draft.status = statuses.SIGNED_IN

          return
        case types.SIGN_IN_PENDING:
          draft.status = statuses.SIGNING_IN

          return
        case types.SIGN_OUT_FULFILLED:
          draft.status = statuses.SIGNED_OUT

          return
        case types.SIGN_OUT_PENDING:
          draft.status = statuses.SIGNING_OUT

          return
        default:
          return
      }
    }),
    creators: ({
      types: {
        CHECK, CHECK_FULFILLED, CHECK_FAILURE,
        PATCH, PATCH_FULFILLED, PATCH_FAILURE,
        /* POST, */ POST_FULFILLED, POST_FAILURE,
        RECOVER_ACCOUNT,
        SIGN_IN, SIGN_IN_FULFILLED, SIGN_IN_FAILURE,
        SIGN_OUT, SIGN_OUT_FULFILLED, SIGN_OUT_FAILURE
      }
    }) => ({
      check: () => ({
        type             : CHECK,
        [WAIT_FOR_ACTION]: CHECK_FULFILLED,
        [ERROR_ACTION]   : CHECK_FAILURE
      }),
      recoverAccount: payload => ({
        type             : RECOVER_ACCOUNT,
        payload,
        [WAIT_FOR_ACTION]: POST_FULFILLED,
        [ERROR_ACTION]   : POST_FAILURE
      }),
      requestPasswordReset: payload => ({
        type             : PATCH,
        payload,
        [WAIT_FOR_ACTION]: PATCH_FULFILLED,
        [ERROR_ACTION]   : PATCH_FAILURE
      }),
      signIn: payload => ({
        type             : SIGN_IN,
        payload,
        [WAIT_FOR_ACTION]: SIGN_IN_FULFILLED,
        [ERROR_ACTION]   : SIGN_IN_FAILURE
      }),
      signOut: payload => ({
        type             : SIGN_OUT,
        payload,
        [WAIT_FOR_ACTION]: SIGN_OUT_FULFILLED,
        [ERROR_ACTION]   : SIGN_OUT_FAILURE
      })
    })
  })
