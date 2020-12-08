import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Container, Header, Button, Card, Grid, Image, Loader } from 'semantic-ui-react'

import PetFormModal from '@containers/pet/form/modal'
import { defaultImageUrl } from '@lib/constants'
import { getAge } from '@lib/utils/functions'
import useInfiniteScroll from '@hooks/useInfiniteScroll'

import clientDetailDuck from '@reducers/client/detail'
import clientPetDuck from '@reducers/client/pet'
import petDetailDuck from '@reducers/pet/detail'

import './styles.scss'

function PetsSection({ clientDetail, clientPet, ...props }) {
  const { item: client } = clientDetail

  useInfiniteScroll('.client-pet-list .ui.card', clientPet, props.getClientPets)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column
          computer={8} mobile={11} tablet={8}
          verticalAlign='middle'>
          <Header as='h2'>Pets</Header>
        </Grid.Column>
        <Grid.Column
          className='ui-grid-align'
          computer={8} mobile={9} tablet={8}>
          <Button color='teal' content='New Pet' onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <div className='mh24 mv32'>
        <Card.Group className='client-pet-list' doubling={true} itemsPerRow={2}>
          {
            clientPet.items.length > 0 ? (
              clientPet.items.map((pet, index) => (
                <Card key={index}>
                  <Card.Content>
                    <Grid>
                      <Grid.Column computer={7} mobile={10} tablet={7}>
                        <Image
                          circular
                          fluid
                          src={pet.image_filepath || defaultImageUrl}/>
                      </Grid.Column>
                      <Grid.Column computer={9} mobile={14} tablet={7}>
                        <Card.Header
                          as={Link} className='mt12 mb8 text-underline' content={pet.name}
                          to={{
                            pathname: `/pet/${pet.id}`,
                            state   : {
                              client         : client.id,
                              client_fullname: `${client.first_name} ${client.last_name}`
                            }
                          }}>
                        </Card.Header>
                        <Card.Description>
                          <Card.Meta className='mb4'>
                            <span className='text-gray'>Breed : </span>
                            <span className='text-black'>{pet.breed_name}</span>
                          </Card.Meta>
                          <Card.Meta className='mb4'>
                            <span className='text-gray'>Sex&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </span>
                            <span className='text-black'>{(pet.sex === 'F' ? 'Female' : 'Male')}</span>
                          </Card.Meta>
                          <Card.Meta className='mb12'>
                            <span className='text-gray'>Age&nbsp;&nbsp;&nbsp;&nbsp; :  </span>
                            <span className='text-black'>{getAge(pet.born_at)}</span>
                          </Card.Meta>
                        </Card.Description>
                      </Grid.Column>
                    </Grid>
                    <Grid>
                      { pet.fixed && (<Grid.Column  width='4'>
                        {
                          pet.fixed && (
                            <Card.Meta className='mb8'>
                              <Button
                                basic
                                circular
                                color='blue'
                                compact
                                content='FIXED'/>
                            </Card.Meta>
                          )
                        }
                      </Grid.Column>) }
                      <Grid.Column width='8'>
                        {
                          pet.summary.vaccination_status == 'missing' && (
                            <Card.Meta className='mb8'>
                              <Button
                                basic
                                circular
                                color='red'
                                compact
                                content='MISSING'
                                icon='syringe'/>
                            </Card.Meta>
                          )
                        }
                        {
                          pet.summary.vaccination_status == 'expired' && (
                            <Card.Meta className='mb8'>
                              <Button
                                basic
                                circular
                                color='red'
                                compact
                                content='EXPIRED'
                                icon='syringe'/>
                            </Card.Meta>
                          )
                        }
                        {
                          pet.summary.vaccination_status == 'vaccinated' && (
                            <Card.Meta className='mb8'>
                              <Button
                                basic
                                circular
                                color='green'
                                compact
                                content='CURRENT'
                                icon='syringe'/>
                            </Card.Meta>
                          )
                        }
                        {
                          pet.summary.vaccination_status == 'verify' && (
                            <Card.Meta className='mb8'>
                              <Button
                                basic
                                circular
                                color='blue'
                                compact
                                content='VERIFY'
                                icon='syringe'/>
                            </Card.Meta>
                          )
                        }
                        {
                          pet.summary.vaccination_status == 'due' && (
                            <Card.Meta className='mb8'>
                              <Button
                                basic
                                circular
                                color='orange'
                                compact
                                content='COMING DUE'
                                icon='syringe'/>
                            </Card.Meta>
                          )
                        }

                      </Grid.Column>
                    </Grid>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <p style={{ color: '#AAA', textAlign: 'center', width: '100%', marginTop: '1rem' }}>There {'aren\'t'} pets.</p>
            )
          }
        </Card.Group>

        {
          clientPet.status === 'GETTING' && <Loader active className='mt24' inline='centered'/>
        }
      </div>

      <PetFormModal/>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state),
      clientPet   : clientPetDuck.selectors.list(state)
    }), {
      getClientPets: clientPetDuck.creators.get,
      setItem      : petDetailDuck.creators.setItem
    }
  )
)(PetsSection)
