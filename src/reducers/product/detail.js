import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'product/detail',
  initialState: {
    item: {
      is_outstanding: false,
      is_active     : false,
      categories    : []
    }
  }
})
  .extend(detail)
