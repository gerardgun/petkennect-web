import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/pet/incident-action'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/incident-action',
  initialState: {
    config
  }
})
  .extend(list)