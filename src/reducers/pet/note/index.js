import base from '@reducers/base'
import list from '@reducers/common/list'

// import config from '@lib/constants/list-configs/pet/vaccination'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/note',
  initialState: {
    // config
  }
})
  .extend(list)

