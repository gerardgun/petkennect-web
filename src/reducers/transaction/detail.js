import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'transaction/detail',
  initialState: {}
})
  .extend(detail)
