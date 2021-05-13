import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'coupan-setup/coupon/coupon-usage/detail',
  initialState: {}
})
  .extend(detail)
