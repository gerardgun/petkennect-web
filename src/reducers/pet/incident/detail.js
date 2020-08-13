import base from '@reducers/base'
import detail from '@reducers/common/detail'
import detailSend from '@reducers/common/detail-send'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/incident/detail',
  initialState: {}
})
  .extend(detail)
  .extend(detailSend)
