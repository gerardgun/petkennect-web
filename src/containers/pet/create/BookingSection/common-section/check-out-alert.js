import React from 'react'

import { Button,  Modal } from 'semantic-ui-react'
import '../styles.scss'

const CheckOutAlert = props => {
  return (

    <Modal
      className='form-modal'
      onClose={()=>props.handleClose('no',props.alertStatus.id)}
      open={props.alertStatus.status}>
      <Modal.Header className='modal-color'>CheckOut</Modal.Header>
      <Modal.Content className='pl20'>
        <p>Are you Sure you are ready to checkout and create invoice?</p>
      </Modal.Content>
      <Modal.Actions className='modal-color'>
        <Button negative onClick={()=>props.handleClose('no',props.alertStatus.id)}>
        No
        </Button>
        <Button onClick={()=>props.handleClose('checkout',props.alertStatus.id)} positive>
        Yes
        </Button>
      </Modal.Actions>
    </Modal>

  )
}

export default CheckOutAlert

