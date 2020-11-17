import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Header, Tab, Input, Checkbox, Grid, Select, Modal } from 'semantic-ui-react'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'
import { parseResponseError } from '@lib/utils/functions'

import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'

import './styles.scss'

const NewClientSubmission = props => {
  const {
    clientSubmissionDetail,
    error, handleSubmit, reset, submitting // redux-form
  } = props

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleSubmit = values => {
    if(isUpdating)
      return props.put({ id: clientSubmissionDetail.item.id, ...values })
        .then(_handleClose)
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(_handleClose)
        .catch(parseResponseError)
  }

  const isOpened = useMemo(() => getIsOpened(clientSubmissionDetail.mode), [ clientSubmissionDetail.mode ])

  const panes = [
    { menuItem: 'Client Info', render  : () => (<Tab.Pane>

      <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
      <Form.Group widths={2}>
        <Field
          autoFocus
          component={FormField}
          control={Input}
          label='Name'
          name='first_name'
          placeholder='Enter name'
          readOnly={!!props.user_exists}
          required/>
        <Field
          component={FormField}
          control={Input}
          label='Lastname'
          name='last_name'
          placeholder='Enter lastname'
          readOnly={!!props.user_exists}
          required/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          autoComplete='off'
          component={FormField}
          control={InputMask}
          label='Phone Number'
          mask='(999) 999 9999'
          name='phones'
          placeholder='Enter phone number'
          type='tel'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Email Address'
          name='alt_email'
          placeholder='Enter email'
          type='email'/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Address</Header>
      <Form.Group widths='equal'>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='First Address'
          name='addresses[0]'
          placeholder='Enter address'/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Zip'
          name='Zip'
          placeholder='Enter Zip'/>
      </Form.Group>
      <Form.Group widths='equal'>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          disabled={true}
          label='Country'
          name='country'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          disabled={true}
          label='State'
          name='state'/>
      </Form.Group>
      <Form.Group widths={2}>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          disabled={true}
          label='City'
          name='city'/>
      </Form.Group>

      <Header as='h6' className='section-header' color='blue'>Details</Header>
      <Form.Group widths={2}>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          disabled={true}
          label='Which location are you intersted in?'
          name='intersted_location'/>

        <Checkbox label='Boarding'/>&nbsp;
        <Checkbox label='Day-Camp'/>&nbsp;
        <Checkbox label='All'/>
      </Form.Group>
      <Form.Field>
          How did you hear about us?
      </Form.Field>
      <Form.Field>
        <Checkbox
          label='Friends/ Family'
          name='checkboxRadioGroup'
          radio
          value='friends_family'/>
      </Form.Field>
      <Form.Field>
        <Checkbox
          label='Veterinarion'
          name='checkboxRadioGroup'
          radio
          value='veterinarion'/>
      </Form.Field>
      <Form.Field>
        <Checkbox
          label='Drive By'
          name='checkboxRadioGroup'
          radio
          value='drive_by'/>
      </Form.Field>
      <Form.Field>
        <Checkbox
          label='Other'
          name='checkboxRadioGroup'
          radio
          value='other'/>
      </Form.Field>
      <Form.Group widths='equal'>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Veterinarion Name'
          name='veterinarion_name'
          placeholder='Enter the Veterinarion Name'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Veterinarion Location'
          name='veterinarion_location'
          placeholder='Enter the Veterinarion Location'/>
      </Form.Group>
      <Header as='h6' className='section-header' color='blue'>People Authorized to pick up (Extended Family/ Friends)</Header>
      <Form.Group widths='equal'>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='#1 Name'
          name='authorized_name'
          placeholder='Enter the Name'/>
        <Field
          autoComplete='off'
          component={FormField}
          control={Input}
          label='Relation'
          name='relation_name'
          placeholder='Enter the Relation'/>
      </Form.Group>
    </Tab.Pane>) },
    { menuItem: 'Pets', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Documents', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
  ]

  const isUpdating = Boolean(clientSubmissionDetail.item.id)

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id='new-client-submission-form'  onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>

          <Grid columns={16}>
            <Grid.Row>
              <Grid.Column  computer={11} mobile={16} tablet={16}>
                <Tab panes={panes}/>
              </Grid.Column>
              <Grid.Column computer={5} mobile={16} tablet={16}>
                <Header as='h2' className='segment-content-header'>New Customer</Header>
                <p>Please do not forgot to confirm the following information</p>
                <label>Confirm Pets breed</label>
                <Field
                  component={FormField}
                  control={Select}
                  lebel=''
                  name='breed'
                  options={[
                    { key: 1, value: 1, text: 'breed1' }
                  ]}
                  placeholder='Select breed'
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  label='Update Vaccinations'
                  name='vaccination'
                  type='checkbox'/>

                <Button
                  basic className='w100' color='teal'
                  content='Add Note'
                  icon='plus'/>

                <div className='c-note-item'>
                  {/* Header */}
                  <div className='flex justify-between align-center mb20'>
                    <div className='avatar-wrapper'>
                      <div className='avatar'>
                        A
                      </div>
                      <div>
                        <p>Aliica Valerica</p>
                        <span className='text-gray'>12/12/2020 22:34</span>
                      </div>
                    </div>
                    <div>
                      <Button
                        basic color='red'
                        icon='trash alternate outline'/>
                    </div>
                  </div>

                  {/* Content */}
                  <p className='description'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pretium fringilla magna mi donec mauris quisque egestas interdum sapien.
                  In vitae scelerisque vitae nam vulputate urna. Urna egestas et,
                  eget turpis et id morbi posuere proin. Et tempor pellentesque lectus
                  consectetur
                  </p>
                </div>

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
              </Grid.Column>
            </Grid.Row>

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

        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const clientSubmissionDetail = clientSubmissionDetailDuck.selectors.detail(state)

      return {
        clientSubmissionDetail,
        initialValues: clientSubmissionDetail.item
      }
    },
    {
      post     : clientSubmissionDetailDuck.creators.post,
      put      : clientSubmissionDetailDuck.creators.put,
      resetItem: clientSubmissionDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form              : 'new-client-submission-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(NewClientSubmission)
