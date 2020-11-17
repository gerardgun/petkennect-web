import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'cancellation-logs/detail',
  initialState: {}
})
  .extend(detail)
