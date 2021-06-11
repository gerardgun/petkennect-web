import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/reservation/boarding/detail',
  initialState: {
    form: {
      pet_options     : [],
      location_options: [],
      service_options : []
    }
  }
})
  .extend(detail)
  .extend({
    types   : [ 'CREATE_GET_SERVICES_TYPES_BY_LOCATION' ],
    creators: ({
      types: {
        CREATE_GET_SERVICES_TYPES_BY_LOCATION
      }
    }) => ({
      createGetServiceTypesByLocation: (payload = {}) => ({ type: CREATE_GET_SERVICES_TYPES_BY_LOCATION, payload })
    })
  })
