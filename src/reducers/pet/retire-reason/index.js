import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/retire-reason'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/retire-reason',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)