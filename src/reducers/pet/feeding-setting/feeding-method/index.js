import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/feeding-setting/feeding-method'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/feeding-setting/feeding-method',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
