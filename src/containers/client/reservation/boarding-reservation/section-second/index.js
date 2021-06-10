import React from 'react'

import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Input,
  Select
} from 'semantic-ui-react'
import { PetCard } from '@components/PetCard'
import { Field, formValueSelector } from 'redux-form'
import FormField from '@components/Common/FormField'
import SelectPetsSectionForm from '../../components/SelectPetsSectionForm'
import { useSelector } from 'react-redux'
import boardingReservationBookDetailDuck from '@reducers/client/reservation/boarding-reservation-book/detail'

const selector = formValueSelector('boarding-form')
const BoardingSectionSecond = (props) => {
  const detail = useSelector(boardingReservationBookDetailDuck.selectors.detail)

  const pets = useSelector((state) =>
    selector(state, 'pets')
  )

  return (
    <Grid className='mb40' columns='equal' id='boarding-container'>
      <Grid.Column only='large screen' />

      <Grid.Column largeScreen={12} widescreen={16}>
        <Grid className='mt40'>
          <Grid.Row>
            <Header as='h1' color='teal' content='Select Additional Services' />
          </Grid.Row>

          
            <Grid className='w100'>
              <Grid.Row>
                <Grid.Column width={6}>
                  <Header as='h3' color='blue'>
                    General Add on Services
                  </Header>
                </Grid.Column>
                <Grid.Column width={2} floated='right'>
                  <Button color='green' positive>
                    Edit
                  </Button>
                </Grid.Column>
              </Grid.Row>

              <Divider className='w100'/>

              <Grid.Row>
                <Grid.Column width={6}>
                  <Header as='h3' color='blue'>
                   Feeding
                  </Header>
                </Grid.Column>
                <Grid.Column width={2} floated='right'>
                  <Button color='green' positive>
                    Edit
                  </Button>
                </Grid.Column>
              </Grid.Row>

              <Divider className='w100'/>

              <Grid.Row>
                <Grid.Column width={6}>
                  <Header as='h3' color='blue'>
                    Medications
                  </Header>
                </Grid.Column>
                <Grid.Column width={2} floated='right' verticalAlign='middle'>
                  <Button color='green' positive>
                    Edit
                  </Button>
                </Grid.Column>
              </Grid.Row>

              <Divider className='w100'/>

              <Grid.Row>
                <Grid.Column width={6}>
                  <Header as='h3' color='blue'>
                    Grooming
                  </Header>
                </Grid.Column>
                <Grid.Column width={2} floated='right' verticalAlign='middle'>
                  <Button color='green' positive>
                    Edit
                  </Button>
                </Grid.Column>
              </Grid.Row>

              <Divider className='w100'/>

              <Grid.Row>
                <Grid.Column width={6}>
                  <Header as='h3' color='blue'>
                    Transport
                  </Header>
                </Grid.Column>
                <Grid.Column width={2} floated='right' verticalAlign='middle'>
                  <Button color='green' positive>
                    Edit
                  </Button>
                </Grid.Column>
              </Grid.Row>

              <Divider className='w100'/>

            </Grid>
        </Grid>
            
        <Grid className='flex flex-row justify-end'>
          <Button color='green'>
              BACK TO:
            <br/>
              Services Information
          </Button>
          <Button color='teal'>
              CONTINUE:
            <br/>
              Sumary
          </Button>
        </Grid>
      </Grid.Column>

      <Grid.Column only='large screen' />
    </Grid>
  )
}

export default BoardingSectionSecond
