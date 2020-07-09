import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/training-method'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'training-method',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
