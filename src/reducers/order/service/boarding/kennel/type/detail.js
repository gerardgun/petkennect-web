import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'order/service/boarding/kennel/type/detail',
  initialState: {
    form: {
      kennel_area_options : [],
      is_surcharge_options: [],
      charge_type_options : []
    }
  }
})
  .extend(detail)
