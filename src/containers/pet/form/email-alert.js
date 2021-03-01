// changes
import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { Button, Icon, Header, Modal } from 'semantic-ui-react'
import trainingMethodDetailDuck from '@reducers/training-method/detail'
import emailMessageDetailDuck from '@reducers/email-message/detail'
import CryptoJS from 'crypto-js'

const EmailAlert = (props) => {
  const {
    trainingMethodDetail,
    clientId,
    petDetail
  } = props

  const getIsOpened = mode => (mode === 'READ')

  const _handleClose = () =>{
    if(trainingMethodDetail.item.petId)
      props.resetEmailAlertItem()

    else
      props.resetEmailAlertItem()
  }

  // eslint-disable-next-line no-unused-vars
  const _handleConfirmClick = values => {
    _handleClose()
  }

  // Encrypt Client Id
  let encryptedId = CryptoJS.AES.encrypt(`${clientId}`, 'code').toString()
  const double_encryptedId = btoa(encryptedId)

  const _handleYesClick = ()=>{
    window.open(`/training-questionnaire/client/${double_encryptedId}/pet/0`, '_blank')
    props.resetEmailAlertItem()
  }

  const isOpened = useMemo(() => getIsOpened(petDetail.mode), [ petDetail.mode ])

  return (
    <Modal
      className='ui-delete-modal'
      onClose={_handleClose}
      open={isOpened}
      size='medium'>
      <Modal.Content style={{ textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <Icon
          circular color='blue' name='info circle'
          size='big' style={{ backgroundColor: 'blue', boxShadow: 'none', fontSize: '2.5rem' }}/>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Header as='h2' style={{ fontWeight: 500 }}>
        Send Training Questionnaire Email?
        </Header>
        {
          <>
            <p style={{ color: 'gray' }}>
              Do you want to send the Training Questionnaire Form to client?
            </p>
          </>
        }

      </Modal.Content>
      <Modal.Actions className='form-modal-action-button'>
        <Button
          className='w120'
          color='teal'
          content='yes' onClick={_handleYesClick}/>
        <Button
          className='w120'
          color='teal'
          content='No' onClick={_handleConfirmClick}/>

      </Modal.Actions>
    </Modal>
  )
}

export default compose(
  connect(
    state => {
      const petDetail = trainingMethodDetailDuck.selectors.detail(state)
      const trainingMethodDetail = trainingMethodDetailDuck.selectors.detail(state)

      return {
        petDetail,
        trainingMethodDetail
      }
    },
    {
      resetEmailAlertItem: trainingMethodDetailDuck.creators.resetItem,

      setEmailItem: emailMessageDetailDuck.creators.setItem
    }
  )

)(EmailAlert)
