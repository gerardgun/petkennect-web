import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'staff-management/employee-time-off/requests/upcoming/detail',
  initialState: {}
})
  .extend(detail)
