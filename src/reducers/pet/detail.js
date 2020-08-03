import base from '@reducers/base'
import detail from '@reducers/common/detail'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/detail',
  initialState: {
    /** temp initialValues, until backend update TINY_INT to BOOL fields*/
    item: {
      info_crate_trained         : 0,
      info_housebroken           : 0,
      info_formal_training       : 0,
      health_flea_tick_preventive: 0,
      summary                    : {
        vaccination_request: null,
        vaccination_status : null
      }
    }
  }
})
  .extend(detail)
