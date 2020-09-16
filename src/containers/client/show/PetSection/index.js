import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Container, Header, Button, Card, Grid, Icon, Image, Loader } from 'semantic-ui-react'

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
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Pets</Header>
        </Grid.Column>
        <Grid.Column textAlign='right'>
          <Button color='teal' content='New Pet' onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <div className='mh24 mv32'>
        <Card.Group className='client-pet-list' itemsPerRow={2}>
          {
            clientPet.items.length > 0 ? (
              clientPet.items.map((pet, index) => (
                <Card key={index}>
                  <Card.Content>
                    <Grid>
                      <Grid.Column width={7}>
                        <Image
                          circular
                          fluid
                          src={pet.image_filepath || defaultImageUrl}/>
                      </Grid.Column>
                      <Grid.Column width={9}>
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
                        {
                          pet.fixed && (
                            <Card.Meta className='mb8'>
                              <Icon color='teal' name='check circle'/> Fixed
                            </Card.Meta>
                          )
                        }
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
