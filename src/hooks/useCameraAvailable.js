
import { useState , useEffect } from 'react'

const useCameraAvailable = () => {
  const [ available , setAvailable ] = useState(false)

  useEffect(()=> {
    let md = navigator.mediaDevices

    if(!md || !md.enumerateDevices) return setAvailable(false)

    md.enumerateDevices().then(devices => {
      setAvailable(
        devices.some(device => device.kind === 'videoinput')
      )})
  },[])

  return available
}

export default useCameraAvailable
