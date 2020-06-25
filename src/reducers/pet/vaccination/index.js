import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/pet/vaccination'
import selector from '@reducers/common/selector'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/vaccination',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(pagination)
  .extend(selector)

