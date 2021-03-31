import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/breed-manager-setting'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/breed-manager-setting',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
