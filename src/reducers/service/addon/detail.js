import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/addon/detail',
  initialState: {
    item: {
      is_active: false
    }
  }
})
  .extend(detail)
