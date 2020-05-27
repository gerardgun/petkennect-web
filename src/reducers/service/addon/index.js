import base from '@reducers/base'

import config from '@lib/constants/list-configs/service/addon'
import list from '@reducers/common/list'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/addon',
  initialState: {
    config
  }
})
  .extend(list)

