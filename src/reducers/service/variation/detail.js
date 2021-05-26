import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/variation/detail',
  initialState: {
    form: {
      employee_schedule_options: [],
      location_options         : [],
      service_group_options    : [],
      service_type_options     : [],
      type_options             : []
    }
  }
})
  .extend(detail)
  .extend({
    types   : [ 'CREATE_GET_LOCATIONS', 'CREATE_GET_SERVICE_TYPES' ],
    creators: ({
      types: {
        CREATE_GET_LOCATIONS,
        CREATE_GET_SERVICE_TYPES
      }
    }) => ({
      createGetLocations   : (payload = {}) => ({ type: CREATE_GET_LOCATIONS, payload }),
      createGetServiceTypes: (payload = {}) => ({ type: CREATE_GET_SERVICE_TYPES, payload })
    })
  })
