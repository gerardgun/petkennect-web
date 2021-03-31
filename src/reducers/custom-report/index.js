import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@goforclose',
  store       : 'custom-report',
  initialState: {
    item: []
  }
})
  .extend(detail)
