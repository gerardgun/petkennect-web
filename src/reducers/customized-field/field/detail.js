import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'customized-field/field/detail',
  initialState: {}
})
  .extend(detail)
