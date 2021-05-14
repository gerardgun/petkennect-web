import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'order/service/boarding/kennel',
  initialState: {
    pagination: {
      params: {
        page_size: 8
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
