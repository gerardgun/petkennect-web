import base from '@reducers/base'
import detail from '@reducers/common/detail'
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'company-profile/calendar/event/detail',
  initialState: {
  }
})
  .extend(detail)
  .extend({
    types   : [ 'DELETE' ],
    creators: ({
      types: {
        DELETE,
        DELETE_FULFILLED,
        DELETE_FAILURE
      }
    }) => ({
      'delete': (payload = {}) => ({
        type             : DELETE,
        payload,
        [WAIT_FOR_ACTION]: DELETE_FULFILLED,
        [ERROR_ACTION]   : DELETE_FAILURE
      })
    })
  })
