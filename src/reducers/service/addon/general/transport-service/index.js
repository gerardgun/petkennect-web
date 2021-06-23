import base from '@reducers/base'
import list from '@reducers/common/list'
import pagination from '@reducers/common/pagination'

export default base({
  namespace: '@@pet-kennect',
  store    : 'service/addon/general/transport-service'
})
  .extend(list)
  .extend(pagination)

