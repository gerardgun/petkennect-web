import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/location'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'location',
  initialState: {
    config
  }
})
  .extend(list)
