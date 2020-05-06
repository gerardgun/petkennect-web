import React, { memo } from 'react'
import { Image } from 'semantic-ui-react'

const PetImagePreview = memo(({ src }) => {
  return (
    <div  className={'gallery_image_container'} >
      <Image
        bordered className='gallery_image'
        rounded src={src}/>
    </div>
  )
})
export default PetImagePreview
