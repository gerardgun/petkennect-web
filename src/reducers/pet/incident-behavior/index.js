import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/pet/incident-behavior'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/incident-behavior',
  initialState: {
    config
  }
})
  .extend(list)
