
import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/booking-sheet-setting'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'booking-sheet-setting',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
