import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import TextAreaEditor from '@components/Common/TextAreaEditor'
import FormField from '@components/Common/FormField'
import { Button, Select, Input, Form, Header, Modal, Icon, Label } from 'semantic-ui-react'

import petReservationTrainingPackageDetail from '@reducers/pet/reservation/training/package/detail'

const formId = 'training-package-send-form'

const TrainingPackangeSendModal = ({ trainingPackageDetail, ...props }) => {
  const _handleClose = () => {
    props.resetItem()
  }

  const saving = trainingPackageDetail.status === 'SENDING'
  const opened = trainingPackageDetail.mode === 'SEND'

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={opened}
      size='large'>
      <Modal.Content>
        <Header as='h2'>Send Email</Header>
        <Form id='email-modal'>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Input}
              label='Email'
              name='email'
              placeholder='Enter email'
              readOnly
              required
              type='email'/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Input}
              label='Subject'
              name='subject'
              placeholder='Enter subject'
              required/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Select}
              label='Template'

              name='template'
              options={[
                { key: 1, value: 1, text: 'Training Contract only' },
                { key: 2, value: 2, text: 'Training Contract and Client Forms' },
                { key: 3, value: 3, text: 'Follow Up and Feedback' },
                { key: 4, value: 4, text: 'Follow UP emailed on is a date' }
              ]}
              placeholder='Select template'
              selectOnBlur={false}/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={TextAreaEditor}
              label='Description'
              name='body_text'
              required/>
          </Form.Group>

          <Header as='h6' className='section-header' color='blue'>Attachments</Header>
          <Label
            basic color='grey' size='large'
            style={{ fontWeight: '400' }}>
            <Icon name='attach'/>
          </Label>

          <Field component='input' name='id' type='hidden'/>
          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                basic
                className='w120'
                color='teal'
                content='Cancel'
                disabled={saving}
                onClick={_handleClose}
                type='button'/>
              <Button
                className='w120'
                color='teal'
                content='Done'
                disabled={saving}
                form={formId}
                loading={saving}
                type='submit'/>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      trainingPackageDetail: petReservationTrainingPackageDetail.selectors.detail(state)
    }),
    {
      resetItem: petReservationTrainingPackageDetail.creators.resetItem
    }
  ),
  reduxForm({
    form: 'email-modal'
  })

)(TrainingPackangeSendModal)
