import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'report-card-setup/day-service-report/detail',
  initialState: {}
})
  .extend(detail)
