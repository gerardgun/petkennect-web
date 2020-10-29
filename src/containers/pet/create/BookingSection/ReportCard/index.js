import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { Button, Form, Header, Modal, Icon, Grid } from 'semantic-ui-react'

import PetReportCard from '@components/Common/Pet/ReportCard'
import FormError from '@components/Common/FormError'
import { parseResponseError } from '@lib/utils/functions'

import ClientDocumentFormSendModal from '@containers/client/show/DocumentSection/form/send/modal'

import petDetailDuck from '@reducers/pet/detail'
import clientDocumentDetailDuck from '@reducers/client/document/detail'

import './styles.scss'

const ViewReportCardForm = (props) => {
  const {
    petDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form
  } = props

  const getIsOpened = (mode) => mode === 'CREATE' || mode === 'UPDATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props
        .put({ id: petDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props
        .post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(petDetail.mode), [
    petDetail.mode
  ])
  const isUpdating = Boolean(petDetail.item.id)

  const _handleSendReportCardBtnClick = () =>{
    props.setDocumentItem('', 'SEND')
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='view-report-card-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            Report
          </Header>
          <PetReportCard
            item={petDetail.item}/>
          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

          <Grid className='mt16'>
            <Grid.Column  computer={6} mobile={16} tablet={7}>
              <b>Send Email</b>
              <p>* Please send email to pet owner.</p>
            </Grid.Column>
            <Grid.Column  computer={7} mobile={16} tablet={9}>
              <Button onClick={_handleSendReportCardBtnClick} type='button'>
                <Icon name='mail'/>
                <p>Send Email</p>
              </Button>
            </Grid.Column>
          </Grid>

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                color='teal'
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content='Done'
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
        <ClientDocumentFormSendModal/>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    (state) => {
      return {
        petDetail: petDetailDuck.selectors.detail(state)
      }
    },
    {
      resetItem      : petDetailDuck.creators.resetItem,
      setDocumentItem: clientDocumentDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'view-report-card-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(ViewReportCardForm)
