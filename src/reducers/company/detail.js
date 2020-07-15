import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'company/detail',
  initialState: {
    item: {
      theme_color: '#00AA9F'
    }
  }
})
  .extend(detail)
