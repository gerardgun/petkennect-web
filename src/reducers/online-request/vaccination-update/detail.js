import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'online-request/vaccination-update/detail',
  initialState: {}
})
  .extend(detail)
