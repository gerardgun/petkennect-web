import base from '@reducers/base'
import list from '@reducers/common/list'

import config from '@lib/constants/list-configs/pet/boarding-reservation-addon'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation/boarding/add-on',
  initialState: {
    config
  }
})
  .extend(list)
