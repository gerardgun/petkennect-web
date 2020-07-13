import React from 'react'
import { Header, Image, Tab } from 'semantic-ui-react'
import InputReadOnly from '@components/Common/InputReadOnly'
import _get from 'lodash/get'
import './styles.scss'

const defaultImage = 'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1584058305895%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png'

function TabClientInfo({ clientDetail  }) {
  return (
    <Tab.Pane className='border-none'>
      <Header as='h6' className='form-section-header mt36' color='blue'>BASIC INFORMATION</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w33'
          label='Email'
          value={clientDetail.item.email || '-'}/>
        <InputReadOnly
          className='w33'
          label='Name'
          value={clientDetail.item.first_name || '-'}/>
        <InputReadOnly
          className='w33'
          label='Last Name'
          value={clientDetail.item.last_name || '-'}/>
      </div>

      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w33'
          label='Profile Picture'
          value={<Image rounded size='mini' src={clientDetail.item.thumbnail_path || defaultImage}/>}/>
        <InputReadOnly
          className='w33'
          label='Contact Date'
          value={
            clientDetail.item.contact_date
              ? (new Date(clientDetail.item.contact_date)).toLocaleString().split(' ').shift()
              : '-'}/>
        <InputReadOnly
          className='w33'
          label='Location'
          value={clientDetail.item.location_name || '-'}/>

      </div>
      <div className='flex flex-row align-center mv20 justify-start'>
        <InputReadOnly
          className='w33'
          label='Status'
          value={clientDetail.item.status}/>
      </div>

      <Header as='h6' className='form-section-header mt36' color='blue'>CONTACT DETAILS</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w33'
          label='Cell Phone'
          value={_get(clientDetail.item,'phones[0]','-')}/>
        <InputReadOnly
          className='w33'
          label='Home Phone'
          value={_get(clientDetail.item,'phones[1]','-')}/>
        <InputReadOnly
          className='w33'
          label='Work Phone'
          value={_get(clientDetail.item,'phones[2]','-')}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w33'
          label='Other Phone'
          value={_get(clientDetail.item,'phones[3]','-')}/>
        <InputReadOnly
          className='w33'
          label='Alt email'
          value={clientDetail.item.alt_email || '-'}/>
        <InputReadOnly
          className='w33'
          label='Referred'
          value={clientDetail.item.referred || '-'}/>
      </div>

      <Header as='h6' className='form-section-header mt36' color='blue'>CLIENT ADDRESS</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w100'
          label='Address 1'
          value={_get(clientDetail.item,'addresses[0]','-')}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w100'
          label='Address 2'
          value={_get(clientDetail.item,'addresses[1]','-')}/>
      </div>

      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w33'
          label='Zip'
          value={
            clientDetail.item.zip_code
          }/>
        <InputReadOnly
          className='w33'
          label='Country'
          value={clientDetail.item.country || '-'}/>
        <InputReadOnly
          className='w33'
          label='State'
          value={clientDetail.item.state || '-'}/>

      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w33'
          label='City'
          value={
            clientDetail.item.city
          }/>
      </div>
    </Tab.Pane>
  )
}

TabClientInfo.propTypes = {  }

TabClientInfo.defaultProps = {  }

export default TabClientInfo
