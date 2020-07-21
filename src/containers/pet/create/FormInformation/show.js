import React from 'react'
import PropTypes from 'prop-types'
import InputReadOnly from '@components/Common/InputReadOnly'
import { Header, Grid } from 'semantic-ui-react'
import moment from 'moment'
import  _get from 'lodash/get'
import _defaultTo from 'lodash/defaultTo'

import SizeTypes from '@lib/constants/SizeTypes'

function Show({ petDetail  }) {
  const { item: pet } = petDetail
  const clientFullName = `${pet.client_first_name || ''} ${pet.client_last_name || ''}`

  return (
    <div className='ph40 pv32'>

      <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Name Pet'
          value={_defaultTo(pet.name, '-')}/>
        <InputReadOnly
          label='Owner'
          value={_defaultTo(clientFullName, '-')}/>

        <InputReadOnly
          label='Breed'
          value={_defaultTo(pet.breed_name, '-')}/>
        <InputReadOnly
          label='Sex'
          value={pet.sex === 'F' ? 'Female' : 'Male'}/>

        <InputReadOnly
          label='Date of Birth'
          value={(pet.born_at && moment(pet.born_at).format('MM/DD/YYYY')) || '-'}/>
        <InputReadOnly
          label='Fixed'
          value={pet.fixed ? 'Yes' : 'No'}/>

        <InputReadOnly
          label='Vaccination'
          value={_get(pet,'summary.vaccination_status', '-')}/>
        <InputReadOnly
          label='Retired'
          value={pet.retired ? 'Yes' : 'No'}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>APPEARANCE</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Weight'
          value={_defaultTo(pet.weight, '-')}/>
        <InputReadOnly
          label='Size'
          value={_defaultTo(SizeTypes[petDetail.item.size], '-')}/>

        <InputReadOnly
          label='Color'
          value={_defaultTo(pet.info_coloring, '-')}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>TEMPERAMENT</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Day Camp Result'
          value={pet.temp_test_result ? 'Pass' : 'Fail'}/>
        <InputReadOnly
          label='Prefer'
          value={_defaultTo(pet.temp_prefer, '-')}/>

        <InputReadOnly
          label='Attend other day camp'
          value={pet.temp_daycare ? 'Yes' : 'No'}/>
        <InputReadOnly
          label='Where'
          value={_defaultTo(pet.temp_daycare_where, '-')}/>
      </Grid>
      <Grid>
        <InputReadOnly
          label='Any Fear'
          value={_defaultTo(pet.temp_any_fears, '-')}/>
      </Grid>
      <Grid columns={2}>
        <InputReadOnly
          label='Jumped Fences'
          value={pet.temp_jumped_fences ? 'Yes' : 'No'}/>
        <InputReadOnly
          label='Shared water bowls'
          value={pet.temp_shared_water_bowls ? 'Yes' : 'No'}/>

        <InputReadOnly
          label='Bitten Humans'
          value={pet.temp_bitten_human ? 'Yes' : 'No'}/>
        <InputReadOnly
          label='Involved in dog fights'
          value={pet.temp_dog_fights ? 'Yes' : 'No'}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>HEALTH</Header>
      <Grid>
        <InputReadOnly
          label='Medical Restrictions'
          value={_defaultTo(pet.health_medical_restrictions, '-')}/>
      </Grid>
      <Grid columns={2}>
        <InputReadOnly
          label='On heart prevention'
          value={pet.health_heartworm_preventive ? 'Yes' : 'No'}/>
        <InputReadOnly
          label='On flea tick prevention'
          value={pet.health_flea_tick_preventive ? 'Yes' : 'No'}/>

        <InputReadOnly
          label='Allergies'
          value={pet.health_is_allergic ? 'Yes' : 'No'}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>HESITATES TO EAT</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Water'
          value={pet.hesitate_water ? 'Yes' : 'No'}/>
        <InputReadOnly
          label='Peanut butter'
          value={pet.hesitate_peanut_butter ? 'Yes' : 'No'}/>

        <InputReadOnly
          label='Wet food'
          value={pet.hesitate_wet_food ? 'Yes' : 'No'}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>ADITIONAL INFO</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Created at'
          value={(pet.created_at && moment(pet.created_at).format('MM/DD/YYYY')) || '-'}/>
        <InputReadOnly
          label='Created by'
          value={`${pet.employee_first_name || ''} ${pet.employee_last_name || ''}`}/>

        <InputReadOnly
          label='Formal training'
          value={pet.info_formal_training ? 'Yes' : 'No'}/>
        <InputReadOnly
          label='Received dog from'
          value={_defaultTo(pet.info_received_from, '-')}/>
      </Grid>
      <br/>

      <Header as='h6' className='section-header' color='blue'>HESITATES TO EAT</Header>
      <Grid columns={2}>
        <InputReadOnly
          label='Created trained'
          value={pet.info_crate_trained ? 'Yes' : 'No'}/>
        <InputReadOnly
          label='Housebroken'
          value={pet.info_housebroken ? 'Yes' : 'No'}/>
      </Grid>
    </div>
  )
}

Show.propTypes = { petDetail: PropTypes.shape({}) }

Show.defaultProps = { petDetail: { item: {} } }

export default (Show)
