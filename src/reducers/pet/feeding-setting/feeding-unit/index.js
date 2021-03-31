import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/feeding-setting/feeding-unit'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/feeding-setting/feeding-unit',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
