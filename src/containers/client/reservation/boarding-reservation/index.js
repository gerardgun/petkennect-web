import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Grid, Icon, Step } from 'semantic-ui-react'

// Custom components and libs (alphabetically order)
import BoardingSectionFirst from './section-first'
import BoardingSectionSecond from './section-second'

// Duck reducers (alphabetically order)
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'

import '../styles.scss'

const BoardingReservationForm = () => {
  const dispatch = useDispatch()
  const [ step, setStep ] = useState(1)
  const { client = null, pet = null } = useParams()

  const _handleSubmit = (values) => {
    const { submit_mode } = values
    console.log(values)
    if(submit_mode === 'change') {
      setStep(step + 1)

      return
    }

    // crear reserva
  }

  useEffect(() => {
    // Get default data to create a new boarding reservation
    if(pet)
      dispatch(
        boardingReservationBookDetailDuck.creators.create({
          pet
        })
      )
    else
      dispatch(
        boardingReservationBookDetailDuck.creators.create({
          client
        })
      )
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

      {
        step === 1 && <BoardingSectionFirst onSubmit={_handleSubmit}/>
      }
      {
        step === 2 && <BoardingSectionSecond/>
      }

    </Grid>
  )
}

export default BoardingReservationForm
