import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Button, Grid, Header, Form, Segment, Select, Input, Icon } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'

import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import clientPetDuck from '@reducers/client/pet'

import { trainingFormId } from './first'

const TrainingFormWizardSecond = props => {
  const {
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getClientPets()
  }, [])

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
        <div className='div-bar-line'>
        </div>
        <div className='div-bar-content'>
          <Icon name='check circle'/>
          <span>Summary</span>
        </div>
      </div>

      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form className='grooming-second-step-form' onReset={reset} onSubmit={handleSubmit}>

        <Segment>
          <Header as='h3' className='section-info-header'>Select  Package Details</Header>
          <Grid>
            <Grid.Column computer={16}>
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
                  disabled
                  label='Price'
                  name='price'
                  selectOnBlur={false}/>
              </Form.Group>
              <Form.Group widths='equal'>
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
              </Form.Group>
              <Form.Group  widths='equal'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Evaluation Date'
                  name='eval_date'
                  type='date'/>

                <Field
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
            </Grid.Column>

          </Grid>

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
              content='Next'
              onClick={props.onNextStep}
              type='button'/>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

export default compose(
  withRouter,
  connect(
    ({ ...state }) => {
      const petReservationDetail = petReservationDetailDuck.selectors.detail(state)
      const selectedPet = formValueSelector(trainingFormId)(state, 'pet')

      return {
        petReservationDetail,
        initialValues: petReservationDetail.item,
        clientPet    : clientPetDuck.selectors.list(state),
        selectedPet  : selectedPet
      }
    },
    {
      getClientPets: clientPetDuck.creators.get
    }
  ),
  reduxForm({
    form                    : trainingFormId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(TrainingFormWizardSecond)
