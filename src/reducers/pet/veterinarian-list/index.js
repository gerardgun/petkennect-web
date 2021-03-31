import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/veterinarian-list'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/veterinarian-list',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
