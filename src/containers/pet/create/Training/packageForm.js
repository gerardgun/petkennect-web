
import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Modal, Header, Segment, Grid, Button, Form, Select, TextArea, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import FormField from '@components/Common/FormField'
import EmailModal from './emailModal'
import './style.scss'

const TrainingPackage =  () => {
  const [ modaloption,setModalOption ] = useState('close')

  const _handleClickButton = () =>{
    setModalOption('open')
  }

  const _handleClose = () =>{
    setModalOption('close')
  }

  return (
    <>
      <Form onReset='' onSubmit=''>
        <Field component='input' name='id' type='hidden'/>
        <Grid className='mv32'>

          <Grid.Column computer={8} mobile={16}>

            <Segment className='box-field'>
              <Field
                component={FormField}
                control={Select}
                label='Reason for training'

                name='reason'
                options={[
                  { key: 1, value: 1, text: 'Reason 1' },
                  { key: 2, value: 2, text: 'Reason 2' },
                  { key: 3, value: 3, text: 'Reason 3' },
                  { key: 4, value: 4, text: 'Reason 4' }
                ]}
                placeholder='Select Reason'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Select Trainer'

                name='trainer'
                options={[
                  { key: 1, value: 1, text: 'Trainer 1' },
                  { key: 2, value: 2, text: 'Trainer 2' },
                  { key: 3, value: 3, text: 'Trainer 3' },
                  { key: 4, value: 4, text: 'Trainer 4' }
                ]}
                placeholder='Select Trainer'
                selectOnBlur={false}/>

            </Segment>

          </Grid.Column>

          <Grid.Column computer={8} mobile={16}>
            <Segment className='box-field' >

              <Field
                component={FormField}
                control={Input}
                label='Eval Date'
                name='eval_date'

                type='date'/>
              <Field

                component={FormField}
                control={Select}
                label='Status'

                name='status'
                options={[
                  { key: 1, value: 1, text: 'Active ' },
                  { key: 2, value: 2, text: 'Inactive' }

                ]}
                placeholder='status    '
                selectOnBlur={false}/>

            </Segment>
          </Grid.Column>

          <Grid.Column computer={16}>

            <Segment>
              <Form.Group widths='2'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Select Package'

                  name='package'
                  options={[
                    { key: 1, value: 1, text: 'Package 1' },
                    { key: 2, value: 2, text: 'Package 2' },
                    { key: 3, value: 3, text: 'Package 3' },
                    { key: 4, value: 4, text: 'Package 4' }
                  ]}
                  placeholder='Select Package'
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Price'
                  name='price'
                  selectOnBlur={false}/>
              </Form.Group>
              <Form.Group widths='2'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Description'
                  name='description'
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Discount'
                  name='discount'
                  selectOnBlur={false}/>

              </Form.Group>

            </Segment>

          </Grid.Column>

          <Grid.Column computer={16}>
            <Segment>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Training Starting Date'
                  name='start_date'
                  type='date'/>

              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  // className='drop-class'
                  component={FormField}
                  control={Select}
                  label='Method'

                  name='method'
                  options={[
                    { key: 1, value: 1, text: 'method 1' },
                    { key: 2, value: 2, text: 'method 2' }

                  ]}
                  placeholder='Select Method'
                  selectOnBlur={false}/>

              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={TextArea}
                  label='Contract Comments'
                  name='contract_comment'/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={TextArea}
                  label='Additional Issue'
                  name='additional_issue'/>

              </Form.Group>
            </Segment>
          </Grid.Column>
        </Grid>
        <Modal
          className='form-modal'
          onClose={_handleClose}
          open={modaloption === 'open'}
          size='large'>
          <Modal.Content>
            <Header as='h2'>Send Email</Header>

            <EmailModal/>

            <Form.Group className='form-modal-actions' widths='equal'>
              <Form.Field>
                <Button
                  basic
                  className='w120'
                  color='teal'
                  content='Cancel'

                  onClick={_handleClose}
                  type='button'/>
                <Button
                  className='w120'
                  color='teal'
                  content='Done'

                  form
                  type='submit'/>
              </Form.Field>
            </Form.Group>

          </Modal.Content>
        </Modal>
        <Segment className='email-box'>

          <Grid.Column computer={16} mobile={16} tablet={16}>
            <Header as='h3'>
             Email Regarding Package
            </Header>

            <Form.Group>

              <Button
                className='email-button'
                color='teal'
                content='Email'
                onClick={_handleClickButton}
                type='button'/>
            </Form.Group>

          </Grid.Column >

        </Segment>
      </Form>
    </>
  )
}
export default compose(
  connect(() => {

  }),
  reduxForm({
    form: 'training-package'

  })

)(TrainingPackage)
