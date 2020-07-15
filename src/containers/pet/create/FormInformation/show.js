import React from 'react'
import PropTypes from 'prop-types'
import InputReadOnly from '@components/Common/InputReadOnly'
import { Header } from 'semantic-ui-react'
import moment from 'moment'
import  _get from 'lodash/get'

import SizeTypes from '@lib/constants/SizeTypes'

function Show({ petDetail  }) {
  const clientFullName = `${petDetail.item.client_first_name || ''} ${petDetail.item.client_last_name || ''}`

  return (
    <div className='ph40 pv32'>
      <Header as='h6' className='section-header mt36' color='blue'>BASIC INFORMATION</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Name Pet'
          value={petDetail.item.name || '-'}/>
        <InputReadOnly
          className='w50'
          label='Owner'
          value={clientFullName || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Breed'
          value={petDetail.item.breed_name || '-'}/>
        <InputReadOnly
          className='w50'
          label='Sex'
          value={(petDetail.item.sex === 'F' ? 'Female' : 'Male')}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Date of Birth'
          value={(petDetail.item.born_at && moment(petDetail.item.born_at).format('MM/DD/YYYY')) || '-'}/>
        <InputReadOnly
          className='w50'
          label='Fixed'
          value={petDetail.item.fixed ? 'Yes' : 'No'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Vaccination'
          value={_get(petDetail,'item.summary.vaccination_status', '-')}/>
        <InputReadOnly
          className='w50'
          label='Retired'
          value={petDetail.item.retired ? 'Yes' : 'No'}/>
      </div>

      <Header as='h6' className='section-header mt36' color='blue'>APPEARANCE</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Weight'
          value={petDetail.item.weight || '-'}/>
        <InputReadOnly
          className='w50'
          label='Size'
          value={SizeTypes[petDetail.item.size] || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Color'
          value={petDetail.item.info_coloring || '-'}/>
      </div>

      <Header as='h6' className='section-header mt36' color='blue'>TEMPERAMENT</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Day Camp Result'
          value={petDetail.item.temp_test_result ? 'Pass' : 'Fail'}/>
        <InputReadOnly
          className='w50'
          label='Prefer'
          value={petDetail.item.temp_prefer || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Attend other day camp'
          value={petDetail.item.temp_daycare ? 'Yes' : 'No'}/>
        <InputReadOnly
          className='w50'
          label='Where'
          value={petDetail.item.temp_daycare_where || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Any Fear'
          value={petDetail.item.temp_any_fears || '-'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Jumped Fences'
          value={petDetail.item.temp_jumped_fences ? 'Yes' : 'No'}/>
        <InputReadOnly
          className='w50'
          label='Shared water bowls'
          value={petDetail.item.temp_shared_water_bowls ? 'Yes' : 'No'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Bitten Humans'
          value={petDetail.item.temp_bitten_human ? 'Yes' : 'No'}/>
        <InputReadOnly
          className='w50'
          label='Involved in dog fights'
          value={petDetail.item.temp_dog_fights ? 'Yes' : 'No'}/>
      </div>

      <Header as='h6' className='section-header mt36' color='blue'>HEALTH</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w100'
          label='Medical Restrictions'
          value={petDetail.item.health_medical_restrictions}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='On heart prevention'
          value={petDetail.item.health_heartworm_preventive ? 'Yes' : 'No'}/>
        <InputReadOnly
          className='w50'
          label='On flea tick prevention'
          value={petDetail.item.health_flea_tick_preventive ? 'Yes' : 'No'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Allergies'
          value={petDetail.item.health_is_allergic ? 'Yes' : 'No'}/>
      </div>

      <Header as='h6' className='section-header mt36' color='blue'>HESITATES TO EAT</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Water'
          value={petDetail.item.hesitate_water ? 'Yes' : 'No'}/>
        <InputReadOnly
          className='w50'
          label='Peanut butter'
          value={petDetail.item.hesitate_peanut_butter ? 'Yes' : 'No'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Wet food'
          value={petDetail.item.hesitate_wet_food ? 'Yes' : 'No'}/>
      </div>

      <Header as='h6' className='section-header mt36' color='blue'>ADITIONAL INFO</Header>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Created at'
          value={(petDetail.item.created_at && moment(petDetail.item.created_at).format('MM/DD/YYYY')) || '-'}/>
        <InputReadOnly
          className='w50'
          label='Created by'
          value={`${petDetail.item.employee_first_name || ''} ${petDetail.item.employee_last_name || ''}`}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Formal training'
          value={petDetail.item.info_formal_training ? 'Yes' : 'No'}/>
        <InputReadOnly
          className='w50'
          label='Received dog from'
          value={petDetail.item.info_received_from ? 'Yes' : 'No'}/>
      </div>
      <div className='flex flex-row align-center mv20'>
        <InputReadOnly
          className='w50'
          label='Created trained'
          value={petDetail.item.info_crate_trained ? 'Yes' : 'No'}/>
        <InputReadOnly
          className='w50'
          label='Housebroken'
          value={petDetail.item.info_housebroken ? 'Yes' : 'No'}/>
      </div>
    </div>
  )
}

Show.propTypes = { petDetail: PropTypes.shape({}) }

Show.defaultProps = { petDetail: { item: {} } }

export default (Show)
