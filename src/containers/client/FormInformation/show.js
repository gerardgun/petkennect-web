import React from 'react'
import PropTypes from 'prop-types'
import InputReadOnly from '@components/Common/InputReadOnly'
import { Header, Grid } from 'semantic-ui-react'
import moment from 'moment'
import _get from 'lodash/get'
import _defaultTo from 'lodash/defaultTo'

function Show({ clientDetail  }) {
  const { item: client } = clientDetail

  const peopleToPickup = Array.isArray(client.authorized_people_pick_up) ? client.authorized_people_pick_up : []

  return (
    <div className='ph40 pv32'>
      <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Email'
          value={_defaultTo(client.email, '-')}/>
        <InputReadOnly
          label='Name'
          value={_defaultTo(client.first_name, '-')}/>

        <InputReadOnly
          label='Last Name'
          value={_defaultTo(client.last_name, '-')}/>
        <InputReadOnly
          label='Contact Date'
          value={(clientDetail.item.contact_date && moment(clientDetail.item.contact_date).format('MM/DD/YYYY')) || '-'}/>

        <InputReadOnly
          label='Location'
          value={client.location ? `${client.location_code} - ${client.location_name}` : '-'}/>
        <InputReadOnly
          label='Name'
          value={client.is_active ? 'Active' : 'Inactive'}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>CONTACT DETAILS</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Cell Phone'
          value={_get(client, 'phones[0]', '-')}/>
        <InputReadOnly
          label='Home Phone'
          value={_get(client, 'phones[1]', '-')}/>

        <InputReadOnly
          label='Work Phone'
          value={_get(client, 'phones[2]', '-')}/>
        <InputReadOnly
          label='Other Phone'
          value={_get(client, 'phones[3]', '-')}/>

        <InputReadOnly
          label='Alt Email'
          value={_defaultTo(client.alt_email, '-')}/>
        <InputReadOnly
          label='Referred'
          value={_defaultTo(client.referred, '-')}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>CLIENT ADDRESS</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Address1'
          value={_get(client, 'addresses[0]', '-')}/>
        <InputReadOnly
          label='Address2'
          value={_get(client, 'addresses[1]', '-')}/>

        <InputReadOnly
          label='Zip'
          value={_defaultTo(client.zip_code, '-')}/>
        <InputReadOnly
          label='Country'
          value={_defaultTo(client.country, '-')}/>

        <InputReadOnly
          label='City'
          value={_defaultTo(client.city, '-')}/>
        <InputReadOnly
          label='State'
          value={_defaultTo(client.state, '-')}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>EMERGENCY CONTACT</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Name'
          value={_defaultTo(client.emergency_contact_name, '-')}/>
        <InputReadOnly
          label='Relation'
          value={_defaultTo(client.emergency_contact_relationship, '-')}/>

        <InputReadOnly
          label='Phone'
          value={_get(client, 'emergency_contact_phones[0]', '-')}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>VETERINARIAN CONTACT</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Vet Name'
          value={_defaultTo(client.emergency_vet_name, '-')}/>
        <InputReadOnly
          label='Vet Locatoin'
          value={_defaultTo(client.emergency_vet_location, '-')}/>

        <InputReadOnly
          label='Vet Phone'
          value={_get(client, 'emergency_vet_phones[0]', '-')}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>PEOPLE AUTORIZED TO PICK UP</Header>
      <Grid columns={1}>
        {
          peopleToPickup.length > 0 ? (
            peopleToPickup.map((_person,index) => (
              <Grid.Column key={index}>
                <span className='mr40'>{_person.name}</span>
                <span className='text-gray'>{_person.relation}</span>
              </Grid.Column>
            ))
          ) : (
            <Grid.Column>
              <p className='text-gray'>The are not authorized people to pick up.</p>
            </Grid.Column>
          )
        }
      </Grid>
    </div>
  )
}

Show.propTypes = { petDetail: PropTypes.shape({}) }

Show.defaultProps = { petDetail: { item: {} } }

export default Show
