import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'staff-management/information/personal-detail/detail',
  initialState: {}
})
  .extend(detail)
