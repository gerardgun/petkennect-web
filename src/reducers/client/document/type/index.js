import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/client/document/type'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/document/type',
  initialState: {
    config
  }
})
  .extend(list)
