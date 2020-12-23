import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/training-package'

export default base({
  namespace   : '@@goforclose',
  store       : 'training-package',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
