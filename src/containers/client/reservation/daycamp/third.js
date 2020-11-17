import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'

import InputReadOnly from '@components/Common/InputReadOnly'
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
      <div className='div-progress-bar mv32'>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Service Information</span>
        </div>
        <div className='div-bar-line active'>
        </div>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Pet Information</span>
        </div>
        <div className='div-bar-line active'>
        </div>
        <div className='div-bar-content active'>
          <Icon name='check circle'/>
          <span>Summary</span>
        </div>
      </div>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>

        <Segment className='section-info-item'>
          <Header as='h3' className='section-info-header text-center'>Summary</Header>
          <Grid>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Segment style={{ height: '100%' }}>
                <div className='justify-between align-center'>
                  <div>
                    <Header as='h3'>
                   General Information
                    </Header>
                    <InputReadOnly
                      label='Pets'
                      value='Lala,Poo'/>
                    <br/>
                    <Grid>
                      <Grid.Column  computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Check In'
                          value='28/12/12 3:12AM'/>
                      </Grid.Column>
                      <Grid.Column  computer={8} mobile={16} tablet={6}>
                        <InputReadOnly
                          label='By'
                          value='Sandra Maravilla'/>
                      </Grid.Column>
                    </Grid>
                    <Grid>
                      <Grid.Column computer={8} mobile={16} tablet={10}>
                        <InputReadOnly
                          label='Check Out'
                          value='28/12/12 3:12AM'/>
                      </Grid.Column>
                      <Grid.Column computer={8} mobile={16} tablet={6}>
                        <InputReadOnly
                          label='By'
                          value='Sandra Maravilla'/>
                      </Grid.Column>
                    </Grid>

                  </div>
                </div>
              </Segment>
            </Grid.Column >
            <Grid.Column  computer={8} mobile={16} tablet={8}>
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
