import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/variation/release/detail',
  initialState: {
    form: {
      employee_trainer_options : [],
      commission_unit_options  : [],
      location_options         : [],
      service_group_name       : null,
      service_name             : null,
      service_variation_options: []
    }
  }
})
  .extend(detail)
  .extend({
    types: [
      'CREATE_GET_LOCATIONS'
    ],
    creators: ({
      types: {
        CREATE_GET_LOCATIONS,
        DELETE, DELETE_FULFILLED, DELETE_FAILURE
      }
    }) => ({
      createGetLocations: (payload = {}) => ({ type: CREATE_GET_LOCATIONS, payload }),
      'delete'          : (id, serviceVariationId) => ({
        type                : DELETE,
        id,
        service_variation_id: serviceVariationId,
        [WAIT_FOR_ACTION]   : DELETE_FULFILLED,
        [ERROR_ACTION]      : DELETE_FAILURE
      })
    })
  })
