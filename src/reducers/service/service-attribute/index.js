import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/service/service-attribute'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/service-attribute',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)

