import React, { useEffect ,useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter ,useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Input, Modal, Label, Icon, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import {  syncValidate } from '@lib/utils/functions'
import locationDuck from '@reducers/location'
import TextAreaEditor from '@components/Common/TextAreaEditor'
import emailMessageDetailDuck from '@reducers/email-message/detail'
import clientDetailDuck from '@reducers/client/detail'
import { emailMeassage } from './email-message'
const EmailCreateForm = (props) => {
  const {
    location,
    emailMessageDetail,
    error,
    handleSubmit,
    reset,
    submitting // redux-form

  } = props

  useEffect(() => {
    props.getClient(clientId)
  }, [])
  const history = useHistory()
  const clientId = emailMessageDetail.item.clientId && emailMessageDetail.item.clientId
  const petId = emailMessageDetail.item.petId && emailMessageDetail.item.petId

  const _handleClose = () => {
    if(emailMessageDetail.item.petId) {
      props.reset()
      props.resetItem()

      history.push({
        pathname: `/pet/${petId}`,
        state   : { option: 'services' }
      })
    }
    else {
      props.reset()
      props.resetItem()
      history.push({
        pathname: `/client/${clientId}`,
        state   : { option: 'reserves' }
      })
    }
  }

  const _handleSubmit = () => {
    // return props
    //   //.sendEmail({ ...values })
    //   .then(_handleClose)
    //   .catch(parseResponseError)
    _handleClose()
  }

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  // const _handleSubjectChange = value => props.change('body_title', value)

  const isOpened = useMemo(() => getIsOpened(emailMessageDetail.mode), [ emailMessageDetail.mode ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Header as='h2' className='segment-content-header'>
            Email
          </Header>
          <Field component='input' name='body_text' type='hidden'/>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='To'
              name='email'
              placeholder='Enter Email'/>

          </Form.Group>

          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Location'
              name='location'
              options={location.items.map(_location =>
                ({ key: _location.id, value: _location.id, text: `${_location.code}` }))
              }
              placeholder='Location'
              required
              selectOnBlur={false}/>

          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Subject'
              name='subject'
              // onChange={_handleSubjectChange}
              placeholder='Enter subject'/>
          </Form.Group>
          <Form.Group className='ph8' widths='equal'>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextAreaEditor}
                label='Description'
                name='body_text'
                required/>
            </Form.Group>
          </Form.Group>

          <Header as='h6' className='section-header' color='blue'>Attachments</Header>
          <Label
            basic color='grey' size='large'
            style={{ fontWeight: '400' }}>
            <Icon name='attach'/> <p>Reservation.pdf</p>
          </Label>

          {error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )}

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel'
                disabled={submitting}
                onClick={_handleClose}
                type='button'/>
              <Button
                color='teal'
                content={'Send'}
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
    ({ ...state }) => {
      const  clientDetail  =  clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        location          : locationDuck.selectors.list(state),
        emailMessageDetail: emailMessageDetailDuck.selectors.detail(state),
        initialValues     : { ...clientDetail.item, body_text: emailMeassage }

      }
    },
    {
      resetItem: emailMessageDetailDuck.creators.resetItem,
      sendEmail: emailMessageDetailDuck.creators.sendEmail,
      getClient: clientDetailDuck.creators.get
    }
  ),
  reduxForm({
    form              : 'email-message-form',
    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : (values) => {
      const schema = {
        subject  : Yup.string().required('Subject is required'),
        body_text: Yup.string().required('Message is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(EmailCreateForm)
