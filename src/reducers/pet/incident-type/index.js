import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

import config from '@lib/constants/list-configs/pet/animal-setting/incident-type'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/incident-type',
  initialState: {
    config
  }
})
  .extend(list)
  .extend(selector)

