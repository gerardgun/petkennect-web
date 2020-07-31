import base from '@reducers/base'
import detail from '@reducers/common/detail'
import mediaEditor from '@reducers/common/media-editor'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/image/detail',
  initialState: {}
})
  .extend(detail)
  .extend(mediaEditor)
