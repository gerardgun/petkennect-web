import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/employee/title'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'employee/title',
  initialState: {
    config
  }
})
  .extend(list)
