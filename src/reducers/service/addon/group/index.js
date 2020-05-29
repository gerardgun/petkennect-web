/** only client side */
import base from '@reducers/base'
import list from '@reducers/common/list'

// import config from '@lib/constants/list-configs/service/addon'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/addon/group',
  initialState: {
    // config
  }
})
  .extend(list)

