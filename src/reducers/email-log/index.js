import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'
import pagination from '@reducers/common/pagination'

export default base({
  namespace: '@@pet-kennect',
  store    : 'email-log'
})
  .extend(list)
  .extend(selector)
  .extend(pagination)
