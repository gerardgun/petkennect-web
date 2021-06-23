import base from '@reducers/base'
import detail from '@reducers/common/detail'
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/addon/general/transport-service/detail',
  initialState: {
    form: {
      service_group_options   : [],
      service_type_options    : [],
      transport_addons_options: [],
      location_total_options  : [],
      location_options        : []
    }
  }
})
  .extend(detail)
  .extend({
    types   : [ 'GET_SERVICE_TYPES', 'GET_RESERVATION_TYPES', 'DELETE', 'POST_PRICE' ],
    creators: ({
      types: {
        GET_SERVICE_TYPES,
        GET_RESERVATION_TYPES,
        DELETE,
        DELETE_FULFILLED,
        DELETE_FAILURE,
        POST_PRICE,
        POST_FULFILLED,
        POST_FAILURE
      }
    }) => ({
      getServiceTypes    : (payload = {}) => ({ type: GET_SERVICE_TYPES, payload }),
      getReservationTypes: (payload = {}) => ({ type: GET_RESERVATION_TYPES, payload }),
      'delete'           : (payload = {}) => ({
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
