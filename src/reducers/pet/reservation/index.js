import base from '@reducers/base'
import list from '@reducers/common/list'
// import pagination from '@reducers/common/pagination'

import config from '@lib/constants/list-configs/pet/reservation'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation',
  initialState: {
    config
  }
})
  .extend(list)
  // .extend(pagination)
