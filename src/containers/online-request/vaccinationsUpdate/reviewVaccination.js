import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Grid, Icon } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'

import vaccinationUpdateDetailDuck from '@reducers/online-request/vaccination-update/detail'

const ReviewForm = props => {
  const {
    vaccinationUpdateDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: vaccinationUpdateDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(vaccinationUpdateDetail.mode), [ vaccinationUpdateDetail.mode ])
  const isUpdating = Boolean(vaccinationUpdateDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>Review Upload Vaccinations</Header>
          <Field component='input' name='id' type='hidden'/>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Vaccine'
              name='vaccine'
              placeholder=''
              required/>
            <Field
              component={FormField}
              control={Input}
              label='Expiry date'
              name='expiry_date'
              required
              type='date'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Vaccine'
              name='vaccine'
              placeholder=''
              required/>
            <Field
              component={FormField}
              control={Input}
              label='Expiry date'
              name='expiry_date'
              required
              type='date'/>
          </Form.Group>
          <Grid className='mt16'>
            <Grid.Column  computer={10} mobile={16} tablet={7}>
              <b>View Document</b>
              <p>* Please send email to pet owner.</p>
            </Grid.Column>
            <Grid.Column  computer={6} mobile={16} tablet={9}>
              <Button type='button'>
                <Icon name='file pdf outline'/>
                <p>View Document</p>
              </Button>
            </Grid.Column>
          </Grid>

          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                color='teal'
                content='Reject'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content='Approve'
                disabled={submitting}
                loading={submitting}/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const vaccinationUpdateDetail = vaccinationUpdateDetailDuck.selectors.detail(state)

      return {
        vaccinationUpdateDetail,
        initialValues: vaccinationUpdateDetail.item
      }
    },
    {
      post     : vaccinationUpdateDetailDuck.creators.post,
      put      : vaccinationUpdateDetailDuck.creators.put,
      resetItem: vaccinationUpdateDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'vaccination-update-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        name: Yup.string().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ReviewForm)
