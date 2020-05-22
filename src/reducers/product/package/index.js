import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/product/package'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'product/package',
  initialState: {
    config
  }
})
  .extend(list)

