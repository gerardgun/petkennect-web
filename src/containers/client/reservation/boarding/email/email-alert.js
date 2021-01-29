import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import {  withRouter ,useHistory } from 'react-router-dom'
import { compose } from 'redux'
import {  reduxForm } from 'redux-form'
import { Button, Form, Icon, Header, Modal } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'

import trainingMethodDetailDuck from '@reducers/training-method/detail'
import emailMessageDetailDuck from '@reducers/email-message/detail'
export const formId = 'service-alert-form'

const EmailAlert = (props) => {
  const {
    trainingMethodDetail,
    petDetail,
    error
  } = props

  const clientId = trainingMethodDetail.item.clientId && trainingMethodDetail.item.clientId
  const petId = trainingMethodDetail.item.petId && trainingMethodDetail.item.petId
  const history = useHistory()
  const getIsOpened = mode => (mode === 'READ')

  const _handleClose = () =>{
    if(trainingMethodDetail.item.petId) {
      props.resetEmailAlertItem()
      history.push({
        pathname: `/pet/${petId}`,
        state   : { option: 'services' }
      })
    } else {
      props.resetEmailAlertItem()
      // props.resetItem()
      history.push({
        pathname: `/client/${clientId}`,
        state   : { option: 'reserves' }
      })
    }
  }
  // const { client: clientId } = useParams()
  // eslint-disable-next-line no-unused-vars
  const _handleConfirmClick = values => {
    _handleClose()
  }

  const _handleYesClick = ()=>{
    if(trainingMethodDetail.item.petId) {
      props.setEmailItem({ clientId: clientId, petId: petId },'CREATE')
      props.resetEmailAlertItem()
    }
    else {
      props.setEmailItem({ clientId: clientId },'CREATE')
      props.resetEmailAlertItem()
    }
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
        Send Confirmation Email?
        </Header>
        {
          <>
            <p style={{ color: 'gray' }}>
               No email confirmation has been sent to client, would you like to do this now?
            </p>
          </>
        }

        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
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
  withRouter,
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
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(EmailAlert)
