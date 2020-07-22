import React from 'react'
import PropTypes from 'prop-types'
import InputReadOnly from '@components/Common/InputReadOnly'
import { Header,Grid } from 'semantic-ui-react'
import moment from 'moment'
import _get from 'lodash/get'

function Show({ clientDetail  }) {
  return (
    <div className='ph40 pv32'>
      <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Email'
          value={clientDetail.item.email || '-'}/>
        <InputReadOnly
          label='Name'
          value={clientDetail.item.first_name || '-'}/>
      </Grid>
      <Grid columns={2}>
        <InputReadOnly
          label='Last Name'
          value={clientDetail.item.last_name || '-'}/>
        <InputReadOnly
          label='Contact Date'
          value={(clientDetail.item.contact_date && moment(clientDetail.item.contact_date).format('MM/DD/YYYY')) || '-'}/>
      </Grid>
      <Grid columns={2}>
        <InputReadOnly
          label='Location'
          value={clientDetail.item.location_name || '-'}/>
        <InputReadOnly
          label='Status'
          value={clientDetail.item.is_active ? 'Active' : 'Inactive'}/>
      </Grid>
      <Header as='h6' className='section-header' color='blue'>CONTACT DETAILS</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Cell Phone'
          value={_get(clientDetail.item,'phones[0]','-')}/>
        <InputReadOnly
          label='Home Phone'
          value={_get(clientDetail.item,'phones[1]','-')}/>
      </Grid>
      <Grid columns={2}>
        <InputReadOnly
          label='Work Phone'
          value={_get(clientDetail.item,'phones[2]','-')}/>
        <InputReadOnly
          label='Other Phone'
          value={_get(clientDetail.item,'phones[3]','-')}/>
      </Grid>
      <Grid columns={2}>
        <InputReadOnly
          label='Alt Email'
          value={clientDetail.item.alt_email || '-'}/>
        <InputReadOnly
          label='Referred'
          value={clientDetail.item.referred || '-'}/>
      </Grid>
      <Header as='h6' className='section-header' color='blue'>CLIENT ADDRESS</Header>
      <Grid columns={1}>
        <InputReadOnly
          label='Address1'
          value={_get(clientDetail.item,'addresses[0]','-')}/>
      </Grid>
      <Grid columns={1}>
        <InputReadOnly
          label='Address2'
          value={_get(clientDetail.item,'addresses[1]','-')}/>
      </Grid>

      <Grid columns={2}>
        <InputReadOnly
          label='Zip'
          value={clientDetail.item.zip_code || '-'}/>
        <InputReadOnly
          label='Country'
          value={clientDetail.item.country || '-'}/>
      </Grid>

      <Grid columns={2}>
        <InputReadOnly
          label='City'
          value={clientDetail.item.city || '-'}/>
        <InputReadOnly
          label='State'
          value={clientDetail.item.state || '-'}/>
      </Grid>
      <Header as='h6' className='section-header' color='blue'>EMERGENCY CONTACT</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Name'
          value={clientDetail.item.emergency_contact_name || '-'}/>
        <InputReadOnly
          label='Relation'
          value={clientDetail.item.emergency_contact_relationship || '-'}/>
      </Grid>
      <Grid columns={1}>
        <InputReadOnly
          label='Phone'
          value={_get(clientDetail.item,'emergency_contact_phones[0]','-')}/>
      </Grid>
      <Header as='h6' className='section-header' color='blue'>VETERINARIAN CONTACT</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Vet Name'
          value={clientDetail.item.emergency_vet_name || '-'}/>
        <InputReadOnly
          label='Vet Locatoin'
          value={clientDetail.item.emergency_vet_location || '-'}/>
      </Grid>
      <Grid columns={1}>
        <InputReadOnly
          label='Vet Phone'
          value={_get(clientDetail.item, 'emergency_vet_phones[0]', '-')}/>
      </Grid>
      <Header as='h6' className='section-header' color='blue'>PEOPLE AUTORIZED TO PICK UP</Header>
      {clientDetail.item.authorized_people_pick_up == null ? '-' : clientDetail.item.authorized_people_pick_up.map((_person,index) => (
        <div className='flex flex-row align-center mv20' key={index}>
          <div className='w33 text-regular flex justify-between'>
            <span className='text-black'>{_person.name}</span>
            <span className='text-gray'>{_person.relation}</span>
          </div>
        </div>
      ))}

    </div>
  )
}

Show.propTypes = { petDetail: PropTypes.shape({}) }

Show.defaultProps = { petDetail: { item: {} } }

export default (Show)
