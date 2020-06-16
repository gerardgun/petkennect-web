import React from 'react'
import { Header, Tab } from 'semantic-ui-react'
import InputReadOnly from '@components/Common/InputReadOnly'
import _get from 'lodash/get'
import './styles.scss'

function TabEmergencyInfo({ clientDetail  }) {
  return (
    <Tab.Pane className='border-none'>
      <Header as='h4' className='form-section-header mt35' color='blue'>EMERGENCY CONTACT</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w33'
          label='Names'
          value={clientDetail.item.emergency_contact_name || '-'}/>
        <InputReadOnly
          className='w33'
          label='Relation'
          value={clientDetail.item.emergency_contact_relationship || '-'}/>
        <InputReadOnly
          className='w33'
          label='Phone'
          value={_get(clientDetail.item,'emergency_contact_phones[0]','-')}/>
      </div>
      <Header as='h4' className='form-section-header mt35' color='blue'>VETERINARIAN CONTACT</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w33'
          label='Vet name'
          value={clientDetail.item.emergency_vet_name || '-'}/>
        <InputReadOnly
          className='w33'
          label='Vet location'
          value={clientDetail.item.emergency_vet_location || '-'}/>
        <InputReadOnly
          className='w33'
          label='Vet Phone'
          value={_get(clientDetail.item, 'emergency_vet_phones[0]', '-')}/>
      </div>

      <Header as='h4' className='form-section-header mt35' color='blue'>PEOPLE AUTORIZED TO PICK UP</Header>
      {clientDetail.item.authorized_people_pick_up.map((_person,index) => (
        <div className='flex flex-row align-center mv20' key={index}>
          <div className='w33 text-regular flex justify-between'>
            <span className='text-black'>{_person.name}</span>
            <span className='text-gray'>{_person.relation}</span>
          </div>
        </div>
      ))}

    </Tab.Pane>
  )
}

TabEmergencyInfo.propTypes = {  }

TabEmergencyInfo.defaultProps = {  }

export default TabEmergencyInfo
