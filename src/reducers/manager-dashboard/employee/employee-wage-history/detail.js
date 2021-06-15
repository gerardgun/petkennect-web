import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'manager-dashboard/employee/employee-wage-history/detail',
  initialState: {}
})
  .extend(detail)
