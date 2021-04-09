import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation/day-service-package',
  initialState: {
    pagination: {
      params: {
        page_size: 20
      }
    }
  }
})
  .extend(list)
  .extend(pagination)
