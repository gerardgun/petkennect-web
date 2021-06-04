import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/variation/detail',
  initialState: {
    form: {
      employee_schedule_options   : [],
      location_options            : [],
      service_group_options       : [],
      service_type_options        : [],
      type_options                : [],
      // For boarding activities
      checkout_charge_type_options: [],
      service_group_name          : null,
      service_name                : null,
      service_sku_id              : null,
      service_variation_options   : [],
      // For group classes
      duration_type_options       : []
    }
  }
})
  .extend(detail)
  .extend({
    types: [
      'CREATE_BOARDING_ACTIVITY',
      'CREATE_BOARDING_ACTIVITY_GET_RESERVATIONS',
      'CREATE_GET_LOCATIONS',
      'CREATE_GET_SERVICE_TYPES',
      'CREATE_GROUP_CLASS',
      'EDIT_BOARDING_ACTIVITY',
      'POST_PRICE',
      'POST_BOARDING_ACTIVITY',
      'POST_GROUP_CLASS',
      'PUT_BOARDING_ACTIVITY',
      'PUT_GROUP_CLASS'
    ],
    creators: ({
      types: {
        CREATE_BOARDING_ACTIVITY,
        CREATE_BOARDING_ACTIVITY_GET_RESERVATIONS,
        CREATE_GET_LOCATIONS,
        CREATE_GET_SERVICE_TYPES,
        CREATE_GROUP_CLASS,
        DELETE, DELETE_FULFILLED, DELETE_FAILURE,
        EDIT_BOARDING_ACTIVITY,
        POST_FAILURE,
        POST_FULFILLED,
        POST_PRICE,
        POST_BOARDING_ACTIVITY,
        POST_GROUP_CLASS,
        PUT_BOARDING_ACTIVITY,
        PUT_GROUP_CLASS,
        PUT_FULFILLED,
        PUT_FAILURE
      }
    }) => ({
      createBoardingActivity               : () => ({ type: CREATE_BOARDING_ACTIVITY }),
      createBoardingActivityGetReservations: (payload = {}) => ({ type: CREATE_BOARDING_ACTIVITY_GET_RESERVATIONS, payload }),
      createGetLocations                   : (payload = {}) => ({ type: CREATE_GET_LOCATIONS, payload }),
      createGetServiceTypes                : (payload = {}) => ({ type: CREATE_GET_SERVICE_TYPES, payload }),
      createGroupClass                     : () => ({ type: CREATE_GROUP_CLASS }),
      'delete'                             : (id, serviceId) => ({
        type             : DELETE,
        id,
        service_id       : serviceId,
        [WAIT_FOR_ACTION]: DELETE_FULFILLED,
        [ERROR_ACTION]   : DELETE_FAILURE
      }),
      editBoardingActivity: id => ({ type: EDIT_BOARDING_ACTIVITY, id }),
      postPrice           : (payload = {}) => ({
        type             : POST_PRICE,
        payload,
        [WAIT_FOR_ACTION]: POST_FULFILLED,
        [ERROR_ACTION]   : POST_FAILURE
      }),
      postBoardingActivity: (payload = {}) => ({
        type             : POST_BOARDING_ACTIVITY,
        payload,
        [WAIT_FOR_ACTION]: POST_FULFILLED,
        [ERROR_ACTION]   : POST_FAILURE
      }),
      postGroupClass: (payload = {}) => ({
        type             : POST_GROUP_CLASS,
        payload,
        [WAIT_FOR_ACTION]: POST_FULFILLED,
        [ERROR_ACTION]   : POST_FAILURE
      }),
      putBoardingActivity: payload => ({
        type             : PUT_BOARDING_ACTIVITY,
        payload,
        [WAIT_FOR_ACTION]: PUT_FULFILLED,
        [ERROR_ACTION]   : PUT_FAILURE
      }),
      putGroupClass: payload => ({
        type             : PUT_GROUP_CLASS,
        payload,
        [WAIT_FOR_ACTION]: PUT_FULFILLED,
        [ERROR_ACTION]   : PUT_FAILURE
      })
    })
  })
