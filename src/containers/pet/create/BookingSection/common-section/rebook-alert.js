import React, { useState } from 'react'
import { Button,  Modal } from 'semantic-ui-react'

import '../styles.scss'

const RebookAlert = (props) => {
  const [ rebookStatus,setRebookStatus ] = useState(false)

  const _handleModalClose = ()=>{
    setRebookStatus(false)
    props.handleClose()
  }

  return (

    <Modal
      className='form-modal'
      onClose={_handleModalClose}
      open={props.alertStatus}>
      <Modal.Header className='modal-color'>Rebook</Modal.Header>
      <Modal.Content className='pl20'>
        {
          rebookStatus ? (
            <p>Yes, the reservation is now booked.</p>
          )
            : (<p>Are you sure, you want to rebook the reservation? </p>)
        }

      </Modal.Content>
      <Modal.Actions className='modal-color'>{
        rebookStatus ?  <Button  onClick={_handleModalClose} positive>
        close
        </Button> : (<>

          <Button negative onClick={()=>props.handleClose()}>
            No
          </Button>
          <Button onClick={()=>setRebookStatus(true)} positive>
            Yes
          </Button></>

        )
      }

      </Modal.Actions>
    </Modal>

  )
}

export default  RebookAlert

