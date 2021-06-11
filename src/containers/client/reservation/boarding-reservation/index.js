import { syncValidate } from '@lib/utils/functions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Button, Form, Grid, Icon, Step } from 'semantic-ui-react'
import * as Yup from 'yup'
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'
import BoardingSectionFirst from './section-first'
import { useParams } from 'react-router-dom'
import serviceGroups from '@lib/constants/serviceGroups'
import '../styles.scss'

const BoardingReservationForm = (props) => {
  const dispatch = useDispatch()
  const detail = useSelector(
    boardingReservationBookDetailDuck.selectors.detail
  )
  const editing = Boolean(detail.item.id)
  const { reset, handleSubmit, initialize } = props
  const [ step, setStep ] = useState(1)
  const { client = null } = useParams()
  const { pet = null } = useParams()

  const _handleSubmit = (values) => {
    console.log(values)
  }

  useEffect(() => {
    // Get default data to create a new boarding reservation
    if(pet)
      dispatch(
        boardingReservationBookDetailDuck.creators.create({
          pet,
          service_group: serviceGroups.BOARDING
        })
      )
    else
      dispatch(
        boardingReservationBookDetailDuck.creators.create({
          client,
          service_group: serviceGroups.BOARDING
        })
      )
  }, [])

  useEffect(() => {
    if(editing) console.log('editing')
    else
      initialize({
        pets: []
      })

    return () => {}
  }, [])

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column only='large screen' width={2}/>
        <Grid.Column largeScreen={12} widescreen={16}>
          <Step.Group className='reservation-steps'>
            <Step className='step' completed={step > 1}>
              <Icon name='check circle'/>
              <Step.Content>
                <Step.Title>Service Information</Step.Title>
              </Step.Content>
            </Step>
            <Step completed={step > 2}>
              <Icon name='check circle'/>
              <Step.Content>
                <Step.Title>Additional Services</Step.Title>
              </Step.Content>
            </Step>
            <Step completed={step > 3}>
              <Icon name='check circle'/>
              <Step.Content>
                <Step.Title>Summary</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Column>
        <Grid.Column only='large screen' width={2}/>
      </Grid.Row>
      {/* eslint-disable-next-line react/jsx-handler-names*/}
      <Form id='boarding-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        {step === 1 && <BoardingSectionFirst {...props}/>}
        <Grid className='mb20' columns='equal'>
          <Grid.Column only='large screen'></Grid.Column>
          <Grid.Column largeScreen={12} widescreen={16}>
            <Grid className='flex flex-row justify-end'>
              <Button color='green' form='boarding-form' type='submit'>
                QUICK BOOK:
                <br/>
                NO OTHER SERVICES
              </Button>
              {/* eslint-disable-next-line react/jsx-handler-names*/}
              <Button color='teal' onClick={() => setStep(step + 1)}>
                CONTINUE:
                <br/>
                ADD OTHER SERVICES
              </Button>
            </Grid>
          </Grid.Column>
          <Grid.Column only='large screen'></Grid.Column>
        </Grid>
      </Form>
    </Grid>
  )
}

const commonDefaultProps = {}

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
