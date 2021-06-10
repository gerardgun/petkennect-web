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
    types   : [ 'CREATE_GET_SERVICE_TYPES', 'CREATE_GET_LOCATIONS' ],
    creators: ({
      types: {
        CREATE_GET_SERVICE_TYPES,
        CREATE_GET_LOCATIONS
      }
    }) => ({
      createGetServiceTypes: (payload = {}) => ({ type: CREATE_GET_SERVICE_TYPES, payload }),
      createGetLocations   : (payload = {}) => ({ type: CREATE_GET_LOCATIONS, payload })
    })
  })
