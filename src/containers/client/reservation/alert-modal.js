import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import {  reduxForm } from 'redux-form'
import { Button, Form, Icon, Header, Modal } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'

import trainingMethodDetailDuck from '@reducers/training-method/detail'

export const formId = 'service-alert-form'

const AlertModal = props => {
  const {
    petDetail,
    error
  } = props

  const getIsOpened = mode => (mode === 'READ')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  // eslint-disable-next-line no-unused-vars
  const _handleConfirmClick = values => {
    _handleClose()
  }

  const isOpened = useMemo(() => getIsOpened(petDetail.mode), [ petDetail.mode ])

  return (
    <Modal
      className='ui-delete-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content style={{ textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <Icon
          circular color='blue' name='info circle'
          size='big' style={{ backgroundColor: 'blue', boxShadow: 'none', fontSize: '2.5rem' }}/>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Header as='h2' style={{ fontWeight: 500 }}>
        No Variation Exists!
        </Header>
        {
          <>
            <p style={{ color: 'gray' }}>
              This location and pet does not have a Price Variation.
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
          content='OK' onClick={_handleConfirmClick}/>

      </Modal.Actions>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const petDetail = trainingMethodDetailDuck.selectors.detail(state)

      return {
        petDetail
      }
    },
    {
      resetItem: trainingMethodDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : formId,
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(AlertModal)
