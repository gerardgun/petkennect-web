import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/reservation/boarding/detail',
  initialState: {
    form: {
      pet_options             : [],
      location_options        : [],
      service_options         : [],
      reservation_type_options: [],
      package_options         : []
    }
  }
})
  .extend(detail)
  .extend({
    types: [
      'CREATE_GET_SERVICES_TYPES_BY_LOCATION',
      'CREATE_GET_RESERVATION_TYPES_AND_PACKAGES_BY_SERVICE'
    ],
    creators: ({
      types: {
        CREATE_GET_SERVICES_TYPES_BY_LOCATION,
        CREATE_GET_RESERVATION_TYPES_AND_PACKAGES_BY_SERVICE
      }
    }) => ({
      createGetServiceTypesByLocation: (payload = {}) => ({
        type: CREATE_GET_SERVICES_TYPES_BY_LOCATION,
        payload
      }),
      createGetReservationTypesAndPackagesByService: (payload = {}) => ({
        type: CREATE_GET_RESERVATION_TYPES_AND_PACKAGES_BY_SERVICE,
        payload
      })
    })
  })
