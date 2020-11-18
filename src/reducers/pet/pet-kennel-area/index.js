import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/pet-kennel-area'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/pet-kennel-area',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
