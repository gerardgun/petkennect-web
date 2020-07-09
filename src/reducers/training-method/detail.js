import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'training-method/detail',
  initialState: {}
})
  .extend(detail)
