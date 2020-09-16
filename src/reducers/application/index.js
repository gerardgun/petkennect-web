import base from '@reducers/base'
import detail from '@reducers/common/detail'
export default base({
  namespace   : '@@pet-kennect',
  store       : 'application',
  initialState: {
    appbar_search_results: []
  }
})
  .extend(detail)
