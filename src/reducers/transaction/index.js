import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/transaction'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'transaction',
  initialState: {
    config
  }
})
  .extend(list)
