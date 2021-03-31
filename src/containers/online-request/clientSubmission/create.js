import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Segment, Button, Form, Header, Tab, Input, Checkbox, Menu, Grid, Select, Modal, Image } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputMask from '@components/Common/InputMask'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import requestClientDocumentListConfig from '@lib/constants/list-configs/online-request/client-submission/client-document'

import RejectForm from './rejectForm'
import PetInfo from './pets/petInfo'
import AdditionalInfo from './pets/additionalInfo'
import ViewNoteSection from '../../online-request/notesSection/'

import clientDocumentDuck from '@reducers/online-request/client-submission/client-document'
import clientSubmissionDetailDuck from '@reducers/online-request/client-submission/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'

import './styles.scss'

const NewClientSubmission = props => {
  const {
    clientSubmissionDetail,
    clientDocumentDetail,
    error, reset, submitting // redux-form
  } = props

  const [ activeMenuItem, setActiveMenuItem ] = useState('petInfo')

  const getIsOpened = mode => (mode === 'CREATE' || mode === 'UPDATE')

  const _handleClose = () =>{
    props.reset()
    props.resetItem()
  }

  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  const [ { _handleOpen } ] = useModal()
  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(clientDocumentDetail.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  const _handleAddNoteBtnClick = (item) =>{
    props.setNoteItem(item, 'CREATE')
  }

  const _handleButtonClick = (item) => {
    props.setItem(item, 'READ')
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

        <Checkbox checked={true} label='Boarding'/>
      </Form.Group>
      <Form.Field>
          How did you hear about us?
      </Form.Field>
      <Form.Group widths='equal'>
        <Checkbox
          checked={true}
          label='Friends/ Family'
          name='checkboxRadioGroup'
          radio
          value='friends_family'/> &nbsp;&nbsp;&nbsp;
        <Input disabled/>
      </Form.Group>
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
    { menuItem: 'Pets', render  : () => (<Tab.Pane>
      <Segment className='petkennect-profile'>
        <Grid>
          <Grid.Column
            computer={16} mobile={16} tablet={16}>
            <Form.Group inline widths={2}>
              <label>Choose Dog</label>
              <Form.Field
                autoFocus
                component={FormField}
                control={Select}
                options={[
                  { key: 1, value: 1, text: 'dog1' }
                ]}
                placeholder='Select dog'
                required
                selectOnBlur={false}
                width={6}/>
            </Form.Group>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column
            computer={5} mobile={16} tablet={16}>
            <div className='flex justify-center align-center'>
              <div className='c-image-profile profile-width'>
                <Image circular src={defaultImageUrl}/>
              </div>
            </div>
            <Menu
              className='petkennect-profile-menu' color='teal' fluid
              vertical>
              <Menu.Item
                active={activeMenuItem === 'petInfo'} link name='petInfo'
                onClick={_handleMenuItemClick}>
                Pet Info
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'additionalInfo'} link name='additionalInfo'
                onClick={_handleMenuItemClick}>
                Additional Info
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'dayCamp'} link name='dayCamp'
                onClick={_handleMenuItemClick}>
                Day Camp
              </Menu.Item>
              <Menu.Item
                active={activeMenuItem === 'boarding'} link name='boarding'
                onClick={_handleMenuItemClick}>
                Boarding
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column
            className='petkennect-profile-body'
            computer={11} mobile={16} tablet={16}>
            {activeMenuItem === 'petInfo' && <PetInfo/>}
            {activeMenuItem === 'additionalInfo' && <AdditionalInfo/>}
            {activeMenuItem === 'dayCamp' && ''}
            {activeMenuItem === 'boarding' && ''}
          </Grid.Column>
        </Grid>
      </Segment>
    </Tab.Pane>) },
    { menuItem: 'Documents', render  : () => (<Tab.Pane>
      <Table
        config={requestClientDocumentListConfig}
        duck={clientDocumentDuck}
        onOptionClick={_handleOptionClick}
        onRowClick={_handleRowClick}/>
    </Tab.Pane>) }
  ]

  return (
    <>
      <Modal
        className='form-modal modal-width'
        onClose={_handleClose}
        open={isOpened}>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names */}
          <Form id='new-client-submission-form'  onReset={reset}>

            <Grid columns={16}>
              <Grid.Row>
                <Grid.Column  computer={12} mobile={16} tablet={16}>
                  <Tab panes={panes}/>
                </Grid.Column>
                <Grid.Column
                  className='notes-margin' computer={4} mobile={16}
                  tablet={16}>
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
                  <Button
                    basic className='w100' color='teal'
                    content='Breed' icon='plus'/>
                  <Field
                    component={FormField}
                    control={Checkbox}
                    format={Boolean}
                    label='Update Vaccinations'
                    name='vaccination'
                    type='checkbox'/>

                  <Button
                    basic className='w100' color='teal'
                    content='Add Note' icon='plus'
                    onClick={_handleAddNoteBtnClick}/>

                  <ViewNoteSection/>

                  <Form.Group className='form-modal-actions div-pet-btn-info' widths='equal'>
                    <Form.Field>
                      <Button
                        basic
                        color='teal'
                        content='Decline'
                        disabled={submitting}
                        onClick={_handleButtonClick}
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
      <RejectForm/>
    </>
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
      post       : clientSubmissionDetailDuck.creators.post,
      put        : clientSubmissionDetailDuck.creators.put,
      resetItem  : clientSubmissionDetailDuck.creators.resetItem,
      setItem    : clientSubmissionDetailDuck.creators.setItem,
      setNoteItem: petNoteDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'new-client-submission-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(NewClientSubmission)
