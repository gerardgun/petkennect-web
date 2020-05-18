import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/product'
import pagination from '@reducers/common/pagination'
import selector from '@reducers/common/selector'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'product',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(pagination)
  .extend(selector)

