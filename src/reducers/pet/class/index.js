import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/class'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/class',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
