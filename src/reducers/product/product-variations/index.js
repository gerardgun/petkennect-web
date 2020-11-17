import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/product/product-variations'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'product/product-variations',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)

