
import base from '@reducers/base'
import list from '@reducers/common/list'
import selector from '@reducers/common/selector'

export default base({
  namespace: '@@pet-kennect',
  store    : 'booking-sheet-setting'
})
  .extend(list)
  .extend(selector)
