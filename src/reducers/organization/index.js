import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/organization'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'organization',
  initialState: {
    config
  }
})
  .extend(list)
