import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'product/product-variations/image/detail',
  initialState: {}
})
  .extend(detail)
