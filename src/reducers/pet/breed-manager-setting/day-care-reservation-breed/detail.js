import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/breed-manager-setting/day-care-reservation-breed/detail',
  initialState: {}
})
  .extend(detail)
