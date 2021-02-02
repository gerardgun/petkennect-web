import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/dashboard/daycamp/daycampCheckedIn'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'dashboard/daycamp/daycampCheckedIn',
  initialState: {
    items     : [],
    config,
    pagination: {
      params: {
        page_size: 20
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
