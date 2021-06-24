import React, { useState } from 'react'
import { Button, Modal } from 'semantic-ui-react'

function TransportModal() {
  const [ open, setOpen ] = useState(false)

  return (
    <Modal
      // eslint-disable-next-line react/jsx-handler-names
      onClose={() => setOpen(false)}
      // eslint-disable-next-line react/jsx-handler-names
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button positive type='button'>Edit</Button>}>

      <Modal.Actions>
        { /* eslint-disable-next-line react/jsx-handler-names */ }
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          icon='checkmark'
          labelPosition='right'
          // eslint-disable-next-line react/jsx-handler-names
          onClick={() => setOpen(false)}
          positive/>
      </Modal.Actions>
    </Modal>
  )
}
export default TransportModal
