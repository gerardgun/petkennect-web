import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'employee/role/service-type/detail',
  initialState: {
    form: {
      employee_role_options   : [],
      service_type_options    : [],
      reservation_type_options: []
    }
  }
})
  .extend(detail)
  .extend({
    creators: ({
      types: {
        CREATE_GET_RESERVATION_TYPES,
        DELETE, DELETE_FULFILLED, DELETE_FAILURE
      }
    }) => ({
      createGetReservationTypes: payload => ({
        payload,
        type: CREATE_GET_RESERVATION_TYPES
      }),
      'delete': (id, employeeRoleId) => ({
        type             : DELETE,
        id,
        employee_role_id : employeeRoleId,
        [WAIT_FOR_ACTION]: DELETE_FULFILLED,
        [ERROR_ACTION]   : DELETE_FAILURE
      })
    }),
    types: [ 'CREATE_GET_RESERVATION_TYPES' ]
  })
