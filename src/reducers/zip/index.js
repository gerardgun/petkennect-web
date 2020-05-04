import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/zip'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'zip',
  initialState: {
    config,
    pagination: {
      params: {
        page_size: 50
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
  .extend(selector)
