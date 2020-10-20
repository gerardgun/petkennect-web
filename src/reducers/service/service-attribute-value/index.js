import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/service/service-attribute-value'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/service-attribute-value',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)

