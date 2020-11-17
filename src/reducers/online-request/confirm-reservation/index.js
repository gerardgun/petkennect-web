import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/online-request/confirm-reservation'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'online-request/confirm-reservations',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(pagination)
