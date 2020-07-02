import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/transaction'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'transaction',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
