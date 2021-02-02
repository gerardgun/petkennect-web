import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/dashboard/daycamp/daycamp'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'dashboard/daycamp',
  initialState: {
    items     : [],
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
