import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'
import selector from '@reducers/common/selector'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/document',
  initialState: {
    pagination: {
      params: {
        page_size: 10
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
  .extend(selector)
