import React , { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const GalleryStateContext = createContext()
const GalleryDispatchContext = createContext()

function GalleryProvider({ children }) {
  const [ items, setItems ] = useState([])

  return (
    <GalleryStateContext.Provider value={items}>
      <GalleryDispatchContext.Provider value={setItems}>
        {children}
      </GalleryDispatchContext.Provider>
    </GalleryStateContext.Provider>
  )
}

function useGalleryState() {
  const context = useContext(GalleryStateContext)
  if(context === undefined)
    throw new Error('useGalleryState() must be used within a GalleryProvider')

  return context
}

function useGalleryDispatch() {
  const context = useContext(GalleryDispatchContext)
  if(context === undefined)
    throw new Error('useGalleryDispatch() must be used within a GalleryProvider')

  return context
}

export {
  GalleryProvider,
  useGalleryState,
  useGalleryDispatch
}
