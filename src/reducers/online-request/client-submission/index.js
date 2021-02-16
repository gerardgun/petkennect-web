import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/online-request/client-submission'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'online-request/client-submission',
  initialState: {
    config,
    pagination: {
      params: {
        page_size: 10
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
