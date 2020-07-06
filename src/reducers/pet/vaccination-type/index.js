import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/vaccination-type'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/vaccination-type',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
