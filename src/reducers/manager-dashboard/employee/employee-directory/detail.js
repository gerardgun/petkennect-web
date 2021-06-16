import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'manager-dashboard/employee/employee-directory/detail',
  initialState: {}
})
  .extend(detail)
