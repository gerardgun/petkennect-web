import produce from 'immer'
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

export default {
  consts: {
    statuses: [
      'SENDING', 'SENT'
    ],
    modes: [
      'SEND'
    ]
  },
  types: [
    'SEND', 'SEND_CANCEL', 'SEND_FAILURE', 'SEND_FULFILLED', 'SEND_PENDING'
  ],
  reducer: (state, action, { types, statuses }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.SEND_CANCEL:
          draft.status = statuses.CANCELED

          return
        case types.SEND_FAILURE:
          for (let key in action.payload) draft[key] = action.payload[key]

          draft.status = statuses.ERROR
          draft.error = action.error

          return
        case types.SEND_FULFILLED:
          for (let key in action.payload) draft[key] = action.payload[key]

          draft.status = statuses.SENT

          return
        case types.SEND_PENDING:
          draft.status = statuses.SENDING

          return
        default:
          return
      }
    }),
  creators: ({
    types: {
      // Para redux-sagas
      SEND, SEND_FULFILLED, SEND_FAILURE
    }
  }) => ({
    // Sagas creators
    sendEmail: payload => ({
      type             : SEND,
      payload,
      [WAIT_FOR_ACTION]: SEND_FULFILLED,
      [ERROR_ACTION]   : SEND_FAILURE
    })
  })
}
