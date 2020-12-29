import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/pet/training-package'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation/training/package',
  initialState: {
    config
  }
})
  .extend(list)
