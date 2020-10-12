import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/product/product-attribute'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'product/product-attribute',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)

