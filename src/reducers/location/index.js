import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/location'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'location',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(pagination)
  .extend(selector)
