import base from '@reducers/base'
import list from '@reducers/common/list'

export default base({
  namespace: '@@pet-kennect',
  store    : 'service/package/day-services'
})
  .extend(list)
