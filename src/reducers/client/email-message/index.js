import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/client/email-message'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/email-message',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(pagination)
