import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/organization/company'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'organization/company',
  initialState: {
    config
  }
})
  .extend(list)
