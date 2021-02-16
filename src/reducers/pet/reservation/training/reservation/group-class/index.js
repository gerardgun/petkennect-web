import base from '@reducers/base'
import list from '@reducers/common/list'
import config from '@lib/constants/list-configs/pet/training-reservation-group-class'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation/training/reservation/group-class',
  initialState: {
    items: [],
    config

  }
})
  .extend(list)
