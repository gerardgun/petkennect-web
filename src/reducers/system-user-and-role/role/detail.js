import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'system-user-and-role/role/detail',
  initialState: {}
})
  .extend(detail)
