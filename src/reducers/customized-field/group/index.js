import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/customized-field'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'customized-field-group',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)
