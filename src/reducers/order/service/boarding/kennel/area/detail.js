import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'order/service/boarding/kennel/area/detail',
  initialState: {
    form: {
      location_options     : [],
      pet_kind_options     : [],
      service_group_options: [],
      is_surcharge_options : [],
      charge_type_options  : []
    }
  }
})
  .extend(detail)
