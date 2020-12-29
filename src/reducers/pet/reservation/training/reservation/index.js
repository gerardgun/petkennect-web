import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/pet/training-reservation'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation/training/reservation',
  initialState: {
    config
  }
})
  .extend(list)
