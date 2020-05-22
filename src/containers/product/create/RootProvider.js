import React from 'react'
import { GalleryProvider } from 'src/contexts/GalleryContext'
import Form from './index'

function RootProvider() {
  return (
    <GalleryProvider>
      <Form/>
    </GalleryProvider>
  )
}

export default RootProvider
