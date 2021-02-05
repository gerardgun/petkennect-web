import base from '@reducers/base'
import list from '@reducers/common/list'
import config from '@lib/constants/list-configs/pet/grooming-reservation-addon'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/reservation/grooming/add-ons',
  initialState: {
    items: [],
    config

  }
})
  .extend(list)

