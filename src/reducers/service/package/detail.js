import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/package/detail',
  initialState: {
    form: {
      service_type_options    : [],
      location_options        : [],
      reservation_type_options: []
    }
  }
})
  .extend(detail)
  .extend({
    types   : [ 'CREATE_GET_SERVICE_TYPES' ],
    creators: ({
      types: {
        CREATE_GET_SERVICE_TYPES
      }
    }) => ({
      createGetServiceTypes: (payload = {}) => ({ type: CREATE_GET_SERVICE_TYPES, payload })
    })
  })
