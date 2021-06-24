import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/package/detail',
  initialState: {
    form: {
      service_type_options: [],
      location_options    : [],
      reservation_options : []
    }
  }
})
  .extend(detail)
  .extend({
    types   : [ 'CREATE_GET_LOCATIONS', 'CREATE_GET_RESERVATIONS', 'COPY' ],
    creators: ({
      types: {
        CREATE_GET_LOCATIONS,
        CREATE_GET_RESERVATIONS,
        COPY
      }
    }) => ({
      createGetLocations   : (payload = {}) => ({ type: CREATE_GET_LOCATIONS, payload }),
      createGetReservations: (payload = {}) => ({ type: CREATE_GET_RESERVATIONS, payload }),
      copy                 : (payload = {}) => ({ type: COPY, payload })
    })
  })
