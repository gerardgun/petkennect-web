import React from 'react'
import PropTypes from 'prop-types'
import InputReadOnly from '@components/Common/InputReadOnly'
import { Header } from 'semantic-ui-react'
import moment from 'moment'
import _get from 'lodash/get'

function Show({ clientDetail  }) {
  return (
    <div className='ph40 pv32'>
      <Header as='h4' className='form-section-header mt36' color='blue'>BASIC INFORMATION</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Email'
          value={clientDetail.item.email || '-'}/>
        <InputReadOnly
          className='w50'
          label='Name'
          value={clientDetail.item.first_name || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Last Name'
          value={clientDetail.item.last_name || '-'}/>
        <InputReadOnly
          className='w50'
          label='Contact Date'
          value={(clientDetail.item.contact_date && moment(clientDetail.item.contact_date).format('MM/DD/YYYY')) || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Location'
          value={clientDetail.item.location_name || '-'}/>
        <InputReadOnly
          className='w33'
          label='Status'
          value={clientDetail.item.is_active ? 'Active' : 'Inactive'}/>
      </div>
      <Header as='h4' className='form-section-header mt36' color='blue'>CONTACT DETAILS</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Cell Phone'
          value={_get(clientDetail.item,'phones[0]','-')}/>
        <InputReadOnly
          className='w50'
          label='Home Phone'
          value={_get(clientDetail.item,'phones[1]','-')}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Work Phone'
          value={_get(clientDetail.item,'phones[2]','-')}/>
        <InputReadOnly
          className='w50'
          label='Other Phone'
          value={_get(clientDetail.item,'phones[3]','-')}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Alt Email'
          value={clientDetail.item.alt_email || '-'}/>
        <InputReadOnly
          className='w50'
          label='Referred'
          value={clientDetail.item.referred || '-'}/>
      </div>
      <Header as='h4' className='form-section-header mt36' color='blue'>CLIENT ADDRESS</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Address1'
          value={_get(clientDetail.item,'addresses[0]','-')}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Address2'
          value={_get(clientDetail.item,'addresses[1]','-')}/>
      </div>

      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Zip'
          value={clientDetail.item.zip_code || '-'}/>
        <InputReadOnly
          className='w50'
          label='Country'
          value={clientDetail.item.country || '-'}/>
      </div>

      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='City'
          value={clientDetail.item.city || '-'}/>
        <InputReadOnly
          className='w50'
          label='State'
          value={clientDetail.item.state || '-'}/>
      </div>
      <Header as='h4' className='form-section-header mt36' color='blue'>EMERGENCY CONTACT</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Name'
          value={clientDetail.item.emergency_contact_name || '-'}/>
        <InputReadOnly
          className='w50'
          label='Relation'
          value={clientDetail.item.emergency_contact_relationship || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Phone'
          value={_get(clientDetail.item,'emergency_contact_phones[0]','-')}/>
      </div>
      <Header as='h4' className='form-section-header mt36' color='blue'>VETERINARIAN CONTACT</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Vet Name'
          value={clientDetail.item.emergency_vet_name || '-'}/>
        <InputReadOnly
          className='w50'
          label='Vet Locatoin'
          value={clientDetail.item.emergency_vet_location || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Vet Phone'
          value={_get(clientDetail.item, 'emergency_vet_phones[0]', '-')}/>
      </div>
      <Header as='h4' className='form-section-header mt36' color='blue'>PEOPLE AUTORIZED TO PICK UP</Header>
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
