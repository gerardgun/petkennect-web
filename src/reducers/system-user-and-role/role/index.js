import base from '@reducers/base'
import list from '@reducers/common/list'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'system-user-and-role/role',
  initialState: {}
})
  .extend(list)
