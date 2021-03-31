import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'
import selector from '@reducers/common/selector'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/comment',
  initialState: {
    pending_comments: [], // Comments to resolve (follow_up = true)
    pagination      : {
      params: {
        page_size: 4
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
  .extend(selector)
