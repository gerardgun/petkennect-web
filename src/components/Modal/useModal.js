import { useState } from 'react'

const useModal = () => {
  const [ open, setOpen ] = useState(false)

  const _handleClose = () => {
    setOpen(false)
  }

  const _handleOpen = () => {
    setOpen(true)
  }

  return [
    open,
    {
      _handleClose,
      _handleOpen
    }
  ]
}

export default useModal
