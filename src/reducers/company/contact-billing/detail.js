import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'company/contact-billing/detail',
  initialState: {
    form: {
      cards: []
    }
  }
})
  .extend(detail)