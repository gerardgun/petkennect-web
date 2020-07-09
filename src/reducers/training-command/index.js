import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/training-command'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'training-command',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
