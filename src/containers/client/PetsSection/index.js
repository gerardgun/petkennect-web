import React from 'react'
import { Header, Button ,Card, Image,Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

function PetsSection({ clientPet  })
{
  const getAge = (date) => {
    if(!date) return '-'

    const years = moment().diff(date, 'year')
    const months = moment().diff(date, 'month')
    const days = moment().diff(date, 'day')
    if(years < 0  || months < 0 || days < 0)
      return ' -'

    if(years === 1)
      return `${years} year`

    if(years > 1)
      return `${years} years`

    if(years === 0) {
      if(months === 0)
        return `${days} days`

      if(months === 1)
        return `${months} month`

      if(months > 1)
        return `${months} months`
    }
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
          <Button
            basic
            className='ml16'
            color='teal'
            content='New Pet'
            size='small'/>
        </div>
        <Card.Group>
          {clientPet.items.map(_pet=> (
            <Card  className='w47' key={_pet.id}>
              <Card.Content>
                <Image
                  circular
                  className='c-square-140'
                  floated='left'
                  size='mini'
                  src={defaultImage}/>
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
          ))}
        </Card.Group>
      </div>
    </div>
  )
}

PetsSection.propTypes = {  }

PetsSection.defaultProps = {  }

export default (PetsSection)
