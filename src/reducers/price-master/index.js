import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/price-master'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'price-master',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
