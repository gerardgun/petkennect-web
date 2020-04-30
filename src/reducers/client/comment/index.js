import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/client/comment'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/comment',
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
  .extend(selector)
