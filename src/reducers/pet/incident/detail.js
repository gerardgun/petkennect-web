import base from '@reducers/base'
import detail from '@reducers/common/detail'
import produce from 'immer'
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/incident/detail',
  initialState: {}
})
  .extend(detail)
  .extend({
    initialState: (duck, previousState = {}) => ({
      ...previousState
    }),
    consts: {
      statuses: [ 'SENDING_EMAIL', 'SENT_EMAIL' ],
      modes   : [ ]
    },
    types: [
      'SEND_EMAIL',
      'SEND_EMAIL_FAILURE',
      'SEND_EMAIL_FULFILLED',
      'SEND_EMAIL_PENDING'
    ],
    reducer: (state, action, { types, statuses }) =>
      produce(state, draft => {
        switch (action.type) {
          case types.SEND_EMAIL_FULFILLED:
            for (let key in action.payload) draft[key] = action.payload[key]

            draft.status = statuses.SENT_EMAIL

            return
          case types.SEND_EMAIL_PENDING:
            draft.status = statuses.SENDING_EMAIL

            return
          default:
            return
        }
      }),
    creators: ({
      types: {
        // Para redux-sagas
        SEND_EMAIL, SEND_EMAIL_FULFILLED, SEND_EMAIL_FAILURE
      }

    }) => ({
      // Sagas creators

      sendEmail: payload => ({
        type             : SEND_EMAIL,
        payload,
        [WAIT_FOR_ACTION]: SEND_EMAIL_FULFILLED,
        [ERROR_ACTION]   : SEND_EMAIL_FAILURE
      })
      // Reducer creators
    }),
    selectors: ({ store }) => ({
      detail: state => state[store]
    })
  })
