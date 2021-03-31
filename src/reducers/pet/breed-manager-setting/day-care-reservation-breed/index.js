import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

export default base({
  namespace: '@@pet-kennect',
  store    : 'pet/breed-manager-setting/day-care-reservation-breed'
})
  .extend(list)
  .extend(selector)
