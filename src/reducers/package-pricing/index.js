import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/package-pricing'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'package-pricing',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
