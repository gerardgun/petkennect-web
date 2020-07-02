import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/employee'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'employee',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(pagination)
  .extend(selector)
