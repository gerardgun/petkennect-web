import { useState } from 'react'

const useToggle = (defaultIsShown = false) => {
  const [ isShown, setIsShown ] = useState(defaultIsShown)

  const toggle = () => setIsShown(prevIsShown => !prevIsShown)

  return [
    isShown,
    toggle
  ]
}

export default useToggle
