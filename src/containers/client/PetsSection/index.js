import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Header, Button, Card, Image, Divider } from 'semantic-ui-react'

import PetFormModal from '@containers/pet/form/modal'
import { defaultImageUrl } from '@lib/constants'
import { getAge } from '@lib/utils/functions'

import clientPetDuck from '@reducers/client/pet'
import petDetailDuck from '@reducers/pet/detail'

function PetsSection({ clientPet, ...props }) {
  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Pets
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='ph40 pv32'>
        <div className='pb16 new_pet_div'>
          <Button color='teal' content='New Pet' onClick={_handleAddBtnClick}/>
        </div>
        <Card.Group>
          {
            clientPet.items.map(_pet=> (
              <Card  className='w47' key={_pet.id}>
                <Card.Content>
                  <Image
                    circular
                    className='c-square-140'
                    floated='left'
                    size='mini'
                    src={defaultImageUrl}/>
                  <Card.Header className='mt12'><Link className='text-underline' to={`/pet/${_pet.id}`}>{_pet.name}</Link></Card.Header>
                  {_pet.fixed ? <Card.Meta className='text-fixed'><i className='check circle icon'></i> Fixed</Card.Meta> : ('')}
                  <Card.Meta className='mt4'>
                    <span className='text-gray'>Breed : </span>
                    <span className='text-black'>{_pet.breed_name}</span>
                  </Card.Meta>
                  <Card.Meta className='mt4'>
                    <span className='text-gray'>Sex : </span>
                    <span className='text-black'>{(_pet.sex === 'F' ? 'Female' : 'Male')}</span>
                  </Card.Meta>
                  <Card.Meta className='mt4'>
                    <span className='text-gray'>Age :  </span>
                    <span className='text-black'>{getAge(_pet.born_at)}</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))
          }
        </Card.Group>
      </div>

      <PetFormModal/>
    </div>
  )
}

export default compose(
  connect(
    state => ({
      clientPet: clientPetDuck.selectors.list(state)
    }), {
      setItem: petDetailDuck.creators.setItem
    })
)(PetsSection)
