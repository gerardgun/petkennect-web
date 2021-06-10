import React, { useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function FeedingModal (){
  const [open, setOpen] = useState(false)
return(
  <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    trigger={<Button type='button' positive>Edit</Button>}>

    <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
  </Modal>
)
}
export default FeedingModal