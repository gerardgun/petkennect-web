import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/medication-setting/medication-unit'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/medication-setting/medication-unit',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
