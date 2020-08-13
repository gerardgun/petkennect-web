import base from '@reducers/base'
import list from '@reducers/common/list'
import config from '@lib/constants/list-configs/client/agreement'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/agreement',
  initialState: {
    config
  }
})

  .extend(list)
