import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { Button, Checkbox, Form, Grid, Header, Segment, Select, Icon, Step } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import AddReportCardForm from  './AddReportCardForm'
import ClientDocumentFormSendModal from '@containers/client/show/DocumentSection/form/send/modal'

import clientDetailDuck from '@reducers/client/detail'
import clientDocumentDetailDuck from '@reducers/client/document/detail'

import { daycampFormId } from './first'

const DaycampFormWizardThird = props => {
  const {
    error, handleSubmit, reset // redux-form
  } = props

  const _handleAddReportCardBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleSendReportCardBtnClick = () =>{
    props.setDocumentItem('', 'SEND')
  }

  return (
    <>
      <Step.Group widths={16}>
        <Step active>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Service Information</Step.Title>
          </Step.Content>
        </Step>
        <Step active>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Pet Information</Step.Title>
          </Step.Content>
        </Step>
        <Step active>
          <Icon name='check circle'/>
          <Step.Content>
            <Step.Title>Summary</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>

        <Segment className='section-info-item'>
          <Header as='h3' className='section-info-header text-center'>Summary</Header>
          <Grid>
            <Grid.Column width={8}>
              <Segment style={{ height: '100%' }}>
                <div className='flex justify-between align-center'>
                  <div>
                    <Header as='h3'>
                   General Information
                    </Header>
                    <InputReadOnly
                      label='Pets'
                      value='Lala,Poo'/>
                    <br/>
                    <Grid>
                      <Grid.Column width={8}>
                        <InputReadOnly
                          label='Check In'
                          value='28/12/12 3:12AM'/>
                      </Grid.Column>
                      <Grid.Column width={8}>
                        <InputReadOnly
                          label='Check Out'
                          value='28/12/12 3:12AM'/>
                      </Grid.Column>
                    </Grid>
                  </div>
                </div>
              </Segment>
            </Grid.Column >
            <Grid.Column width={8}>
              <Segment>
                <div className='flex justify-between align-center'>
                  <div className='w100'>
                    <Header as='h3'>
                   Reservation Note
                    </Header>
                    <div className='mt16'>
                      <label>Note</label>
                      <textarea className='w100' name='specialpickup' rows='5'></textarea>
                    </div>
                  </div>
                </div>
              </Segment>
            </Grid.Column >
          </Grid>

          <Segment>
            <Header as='h3' className='mb0'>Check In</Header>
            <Grid>
              <Grid.Column width={8}>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  label='Check In Now'
                  name='check_in_now'
                  type='checkbox'/>
              </Grid.Column>
              <Grid.Column width={8}>
                <InputReadOnly
                  label='Check in by'
                  value='Alexandra Minano'/>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={6}>
                <Field
                  component={FormField}
                  control={Select}
                  label='Confirmation'
                  name='Confirmation'
                  options={[
                    { key: 1, value: 1, text: 'Test1' },
                    { key: 2, value: 1, text: 'Test2' }
                  ]}
                  placeholder='Select Confirmation'
                  required
                  selectOnBlur={false}/>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment>
            <Header as='h3' className='mb0'>Check Out</Header>
            <Grid>
              <Grid.Column width={8}>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  label='Check Out Now'
                  name='check_out_now'
                  type='checkbox'/>
              </Grid.Column>
              <Grid.Column width={8}>
                <InputReadOnly
                  label='Check out by'
                  value='Alexandra Minano'/>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment>
            <Header as='h3' className='section-info-header'>First Day Report Card</Header>
            <Grid>
              <Grid.Column width={16}>
                <Button
                  basic
                  color='teal'
                  content='Add Report Card'
                  onClick={_handleAddReportCardBtnClick}
                  type='button'/>
              </Grid.Column>
              <Grid.Column width={16}>
                <label>Report Card</label>
                <Button basic className='ml16' icon>
                  <Icon name='edit outline'/>
                </Button>
                <Button
                  basic icon name='SendReport'
                  onClick={_handleSendReportCardBtnClick}  type='button'>
                  <Icon name='envelope outline'/>
                </Button>

                <Button basic icon>
                  <Icon color='red' name='trash alternate'/>
                </Button>
              </Grid.Column>
            </Grid>
          </Segment>

        </Segment>
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
          <Form.Field className='btnBack'>
            <Button
              basic
              className='w120'
              color='teal'
              content='Back'
              onClick={props.onPreviousStep}
              type='button'/>
          </Form.Field>
          <Form.Field>
            <Button
              className='w120'
              color='teal'
              content='Reserve!'
              type='submit'/>
          </Form.Field>
        </Form.Group>
      </Form>
      <ClientDocumentFormSendModal/>
      <AddReportCardForm/>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const clientDetail = clientDetailDuck.selectors.detail(state)

      return {
        clientDetail,
        clientDocumentDetail: clientDocumentDetailDuck.selectors.detail(state),
        initialValues       : clientDetail.item
      }
    },
    {
      resetItem      : clientDetailDuck.creators.resetItem,
      setItem        : clientDetailDuck.creators.setItem,
      setDocumentItem: clientDocumentDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form                    : daycampFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(DaycampFormWizardThird)
