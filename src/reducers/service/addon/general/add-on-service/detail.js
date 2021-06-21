import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/addon/general/add-on-service/detail',
  initialState: {
    form: {
      service_group_options : [],
      service_type_options  : [],
      true_addons_options   : [],
      location_total_options: [],
      location_options      : [],
      calendar_options      : []
    }
  }
})
  .extend(detail)
  .extend({
    types   : [ 'GET_SERVICE_TYPES', 'GET_RESERVATION_TYPES' ],
    creators: ({
      types: {
        GET_SERVICE_TYPES,
        GET_RESERVATION_TYPES
      }
    }) => ({
      getServiceTypes    : (payload = {}) => ({ type: GET_SERVICE_TYPES, payload }),
      getReservationTypes: (payload = {}) => ({ type: GET_RESERVATION_TYPES, payload })
    })
  })
