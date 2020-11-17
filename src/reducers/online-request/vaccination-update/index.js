import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/online-request/vaccination-update'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'online-request/vaccination-update',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(pagination)
