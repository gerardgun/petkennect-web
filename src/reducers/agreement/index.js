import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/agreement'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'agreement',
  initialState: {
    config
  }
})
  .extend(list)
