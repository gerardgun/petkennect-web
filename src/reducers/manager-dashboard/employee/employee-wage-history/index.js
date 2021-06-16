import base from '@reducers/base'
import list from '@reducers/common/list'

export default base({
  namespace: '@@pet-kennect',
  store    : 'manager-dashboard/employee/employee-wage-history'
})
  .extend(list)
