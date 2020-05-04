import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/client/document/type'
import pagination from '@reducers/common/pagination'
// import selector from '@reducers/common/selector'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/document/type',
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
