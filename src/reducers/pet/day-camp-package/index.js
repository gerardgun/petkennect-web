import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/day-camp-package'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/day-camp-package',
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
  .extend(selector)

