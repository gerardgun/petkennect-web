import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'staff-management/notification/notification-setting/manager-notification/detail',
  initialState: {}
})
  .extend(detail)
