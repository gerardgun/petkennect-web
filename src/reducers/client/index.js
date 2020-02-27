import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/client'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
