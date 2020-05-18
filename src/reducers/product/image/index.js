import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/product'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'product/image',
  initialState: {
    config
  }
})
  .extend(list)

