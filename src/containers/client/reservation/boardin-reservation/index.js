import { syncValidate } from '@lib/utils/functions'
import React, { useState } from 'react'
import { reduxForm } from 'redux-form'
import { Form, Grid, Icon, Step } from 'semantic-ui-react'
import * as Yup from 'yup'
import BoardingSectionFirst from './section-first'

const BoardingReservationForm = (props) => {
  const { reset, handleSubmit } = props
  const [ step, setStep ] = useState(1)

  const _handleSubmit = () => {
    setStep(1)
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column  only='large screen' width={2}/>
        <Grid.Column largeScreen={12} widescreen={16}>
          <Step.Group>
            <Step completed={step > 1}>
              <Icon name='check circle outline'/>
              <Step.Content>
                <Step.Title>Service Information</Step.Title>
              </Step.Content>
            </Step>
            <Step completed={step > 2}>
              <Icon name='check circle outline'/>
              <Step.Content>
                <Step.Title>Additional Services</Step.Title>
              </Step.Content>
            </Step>
            <Step completed={step > 3}>
              <Icon name='check circle outline'/>
              <Step.Content>
                <Step.Title>Summary</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Column>
        <Grid.Column  only='large screen' width={2}/>
      </Grid.Row>
      {/* eslint-disable-next-line react/jsx-handler-names*/}
      <Form id='boarding-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        {step === 1 && (
          <BoardingSectionFirst/>
        )}
      </Form>
    </Grid>

  )
}

export default reduxForm({
  form    : 'boarding-form',
  validate: (values) => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(BoardingReservationForm)
