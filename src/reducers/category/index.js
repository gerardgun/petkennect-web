import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/client'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'category',
  initialState: {
    config
  }
})
  .extend(list)
