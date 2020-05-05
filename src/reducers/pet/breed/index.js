import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/pet/breed'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/breed',
  initialState: {
    config
  }
})
  .extend(list)
