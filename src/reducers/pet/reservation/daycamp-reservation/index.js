import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/pet/daycamp-reservation'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation/daycamp-reservation',
  initialState: {
    items     : [],
    config,
    pagination: {
      params: {
        page_size: 5
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
