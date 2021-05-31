/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { Header, Button, Modal } from 'semantic-ui-react'

import './styles.scss'

const CheckedInSuccess = (props)=>{
  const _handleClose = () => {
    props.onModalChange('close')
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={props.modalOpen}>

      <Modal.Content>
        <div className='flex align-center justify-between'>
          <Header
            as='h3' className='mb0' content='Pet has been successfully checked in.'/>
          <Button
            basic
            color='teal'
            content='Close'
            onClick={_handleClose}
            type='button'/>
        </div>

      </Modal.Content>
    </Modal>
  )
}

export default CheckedInSuccess
