import base from '@reducers/base'
import detail from '@reducers/common/detail'
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/addon/general/open-line-service/detail',
  initialState: {
    form: {
      location_options: []
    }
  }
})
  .extend(detail)
  .extend({
    types   : [ 'DELETE', 'POST_PRICE' ],
    creators: ({
      types: {
        DELETE,
        DELETE_FULFILLED,
        DELETE_FAILURE,
        POST_PRICE,
        POST_FULFILLED,
        POST_FAILURE
      }
    }) => ({
      'delete': (payload = {}) => ({
        type             : DELETE,
        payload,
        [WAIT_FOR_ACTION]: DELETE_FULFILLED,
        [ERROR_ACTION]   : DELETE_FAILURE
      }),
      postPrice: (payload = {}) => ({
        type             : POST_PRICE,
        payload,
        [WAIT_FOR_ACTION]: POST_FULFILLED,
        [ERROR_ACTION]   : POST_FAILURE
      })
    })
  })
