import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/food/unit/detail',
  initialState: {
    form: {
      food_type_options: []
    }
  }
})
  .extend(detail)
