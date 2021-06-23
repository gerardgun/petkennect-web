import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Icon, Header, Modal } from 'semantic-ui-react'

import userDetailDuck from '@reducers/system-user-and-role/user/detail'

const AlertModal = (props) => {
  const {
    userDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const _handleClose = () =>{
    props.resetItem()
  }

  const _handleTerminate = () =>{
    props.resetItem()
  }

  const saving = [ 'POSTING' ].includes(userDetail.status)
  const opened = [ 'READ' ].includes(userDetail.mode)

  return (
    <Modal
      open={opened}
      size='small'
      style={{ width: '300px' }}>
      <Modal.Content style={{ textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <Icon
          circular color='red' name='cancel circle'
          size='big' style={{ backgroundColor: 'rgba(221, 75, 57, 0.3)', boxShadow: 'none', fontSize: '2.5rem' }}/>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Header as='h2' style={{ fontWeight: 500 }}>
          Terminate Access
        </Header>
        {
          <>
            <p style={{ color: 'gray' }}>
              Are you sure to Terminate the user access?
            </p>
          </>
        }

      </Modal.Content>
      <Modal.Actions className='form-modal-action-button'>
        <Button
          basic
          className='w120'
          color='grey'
          content='Cancel'
          onClick={_handleClose}
          type='button'/>
        <Button
          className='w120'
          color='red'
          content='Terminate'
          onClick={_handleTerminate}
          type='button'/>
      </Modal.Actions>
    </Modal>
  )
}

export default compose(
  connect(
    (state) => {
      const userDetail = userDetailDuck.selectors.detail(state)

      return {
        userDetail
      }
    },
    {
      post     : userDetailDuck.creators.post,
      resetItem: userDetailDuck.creators.resetItem
    }
  )
)(AlertModal)
