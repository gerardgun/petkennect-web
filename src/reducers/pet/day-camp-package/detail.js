import base from '@reducers/base'
import detail from '@reducers/common/detail'
import detailSend from '@reducers/common/detail-send'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/day-camp-package/detail',
  initialState: {}
})
  .extend(detail)
  .extend(detailSend)
