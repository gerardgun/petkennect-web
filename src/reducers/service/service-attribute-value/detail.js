import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'service/service-attribute-value/detail',
  initialState: {}
})
  .extend(detail)
