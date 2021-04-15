import base from '@reducers/base'
import list from '@reducers/common/list'

export default base({
  namespace: '@@pet-kennect',
  store    : 'pet/reservation/usage/daycamp/reservation'

})
  .extend(list)

