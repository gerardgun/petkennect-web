import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

export default base({
  namespace: '@@pet-kennect',
  store    : 'product/product-attribute'
})
  .extend(list)
  .extend(selector)

