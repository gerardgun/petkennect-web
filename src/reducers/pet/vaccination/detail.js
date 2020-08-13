import base from '@reducers/base'
import detail from '@reducers/common/detail'
import detailSend from '@reducers/common/detail-send'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/vaccination/detail',
  initialState: {
    item: {}
  }
})
  .extend(detail)
  .extend(detailSend)
