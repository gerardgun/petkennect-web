import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/client/interaction'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/interaction',
  initialState: {
    config,
    pagination: {
      params: {
        page_size: 4
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
