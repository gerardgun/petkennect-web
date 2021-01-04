import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/pet/training-package'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation/training/package',
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
