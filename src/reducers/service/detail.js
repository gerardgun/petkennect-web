import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/detail',
  initialState: {
    form: {
      service_group_options: [],
      location_options     : [],
      pet_kind_options     : []
    }
  }
})
  .extend(detail)
