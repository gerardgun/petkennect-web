import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation',
  initialState: {
    pagination: {
      params: {
        page_size: 5
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
