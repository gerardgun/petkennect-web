import base from '@reducers/base'
import detail from '@reducers/common/detail'
import sendEmail from '@reducers/common/sendEmail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/document/detail',
  initialState: {}
})
  .extend(detail)
  .extend(sendEmail)
