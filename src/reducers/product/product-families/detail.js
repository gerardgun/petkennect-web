import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'product/product-families/detail',
  initialState: {
    item: {
      is_outstanding: false,
      is_active     : false,
      categories    : []
    }
  }
})
  .extend(detail)
