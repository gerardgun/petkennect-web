import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace: '@@pet-kennect',
  store    : 'order/service/boarding/kennel/detail'
})
  .extend(detail)
