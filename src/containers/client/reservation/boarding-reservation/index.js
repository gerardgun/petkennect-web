import { syncValidate } from '@lib/utils/functions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Form, Grid, Icon, Step } from 'semantic-ui-react'
import * as Yup from 'yup'
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'
import BoardingSectionFirst from './section-first'
import BoardingSectionSecond from './section-second'
import { useParams } from 'react-router-dom'

const BoardingReservationForm = (props) => {
  const dispatch = useDispatch()
  const detail = useSelector(boardingReservationBookDetailDuck.selectors.detail)
  const editing = Boolean(detail.item.id)
  const { reset, handleSubmit, initialize, comesFromPetScreen } = props
  const [ step, setStep ] = useState(1)
  const { client = null } = useParams()
  const { pet = null } = useParams()

  const _handleSubmit = () => {
    setStep(1)
  }

  useEffect(() => {
    // Get default data to create a new boarding reservation
    if(comesFromPetScreen)
      dispatch(boardingReservationBookDetailDuck.creators.create({ pet }))
    else
      dispatch(boardingReservationBookDetailDuck.creators.create({ client }))
  }, [])

  useEffect(() => {
    if(editing)  console.log('editing')
    else
      initialize({
        pets: []
      })

    return () => {}
  }, [])

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column  only='large screen' width={2}/>
        <Grid.Column largeScreen={12} widescreen={16}>
          <Step.Group>
            <Step completed={step > 1} active={step === 1} onClick={() => setStep(1)} >
              <Icon name='check circle outline'/>
              <Step.Content>
                <Step.Title>Service Information</Step.Title>
              </Step.Content>
            </Step>
            <Step completed={step > 2} active={step === 2} onClick={() => setStep(2)} >
              <Icon name='check circle outline'/>
              <Step.Content>
                <Step.Title>Additional Services</Step.Title>
              </Step.Content>
            </Step>
            <Step completed={step > 3} active={step === 3} onClick={() => setStep(3)} >
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
      <Form id='boarding-form' className='w100' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        {step === 1 && (
          <BoardingSectionFirst {...props}/>
        )}
        {step === 2 && <BoardingSectionSecond />}
      </Form>
    </Grid>

  )
}

const commonDefaultProps = {
}

BoardingReservationForm.defaultProps = {
  childProps        : commonDefaultProps,
  comesFromPetScreen: true,
  ...commonDefaultProps
}

export default reduxForm({
  form    : 'boarding-form',
  validate: (values) => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(BoardingReservationForm)
