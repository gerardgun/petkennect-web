import base from '@reducers/base'
import detail from '@reducers/common/detail'
import editorImage from '@reducers/common/editor-image'

export default base({
  namespace   : '@@pet-kennect',
  store       : 'pet/image/detail',
  initialState: {}
})
  .extend(detail)
  .extend(editorImage)
