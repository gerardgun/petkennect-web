import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'client/reservation/boarding/detail',
  initialState: {
    form: {
      pet_options: []
    }
  }
})
  .extend(detail)
