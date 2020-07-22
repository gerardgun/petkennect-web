import React from 'react'
import PropTypes from 'prop-types'
import { Header, Form } from 'semantic-ui-react'
import moment from 'moment'
import  _get from 'lodash/get'
import _defaultTo from 'lodash/defaultTo'

import SizeTypes from '@lib/constants/SizeTypes'

function Show({ petDetail  }) {
  const { item: pet } = petDetail

  return (
    <div className='ph40 pv32'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form  onSubmit={()=>{}}>
        <Header as='h6' className='section-header mt36' color='blue'>BASIC INFORMATION</Header>
        <Form.Group widths='equal'>
          <Form.Input label='Pet name' readOnly value={_defaultTo(pet.name, '-')}/>
          <Form.Input label='Date of birth' readOnly value={(pet.born_at && moment(pet.born_at).format('MM/DD/YYYY')) || '-'}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Breed' readOnly value={_defaultTo(pet.name, '-')}/>
          <Form.Input label='Size' readOnly value={_defaultTo(SizeTypes[petDetail.item.size], '-')}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Sex' readOnly value={pet.sex === 'F' ? 'Female' : 'Male'}/>
          <Form.Input label='Altered' readOnly value={_defaultTo(pet.altered , '-')}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Vaccination Status' readOnly value={_get(pet,'summary.vaccination_status', '-')}/>
          <Form.Input label='Retired' readOnly value={pet.retired ? 'Yes' : 'No'}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.TextArea  label='Reason' readOnly value={_get(pet,'reason_name', '-')}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Received Dog From' readOnly value={_defaultTo(pet.info_received_from, '-')}/>
          <Form.Input label='Housebroken' readOnly value={pet.info_housebroken ? 'Yes' : 'No'}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Create Trained' readOnly value={pet.info_crate_trained ? 'Yes' : 'No'}/>
          <Form.Input label='Any Formal Training' readOnly value={pet.info_formal_training ? 'Yes' : 'No'}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Created at' readOnly value={(pet.created_at && moment(pet.created_at).format('MM/DD/YYYY')) || '-'}/>
          <Form.Input label='Created by' readOnly value={`${pet.employee_first_name || ''} ${pet.employee_last_name || ''}`}/>
        </Form.Group>

        <Header as='h6' className='section-header mt36' color='blue'>APPEARANCE</Header>

        <Form.Group widths='equal'>
          <Form.Input label='Weight' readOnly value={_defaultTo(pet.weight, '-')}/>
          <Form.Input label='Colors' readOnly value={_defaultTo(pet.info_coloring, '-')}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input label='Markings' readOnly value={_defaultTo(pet.markings, '-')}/>
          <Form.Field/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>HESITATES TO EAT</Header>

        <Form.Group widths='equal'>
          <Form.Input label='Elegible' readOnly value={_defaultTo(pet.hesitate_elegible, '-')}/>
          <Form.Input label='Reason for No' readOnly value={_defaultTo(pet.hesitate_reason_for_no, '-')}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='Date of Testing' readOnly value={_defaultTo(pet.hesitate_date_for_testing, '-')}/>
          <Form.Input label='Link to Day Camp Evaluations results' readOnly value={_defaultTo(pet.hesitate_link_to_day_camp, '-')}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='Attended  Day Care Previusly' readOnly value={pet.temp_daycare ? 'Yes' : 'No'}/>
          <Form.Input label='Previus Day Care' readOnly value={_defaultTo(pet.temp_daycare_where, '-')}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='Ever Removed from Another Day Care' readOnly value={pet.daycare_removed ? 'Yes' : 'No'}/>
          <Form.Input label='Reason for Removal' readOnly value={_defaultTo(pet.daycare_removed_reason, '-')}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>HESITATES TO EAT</Header>

        <Form.Group widths='equals'>
          <Form.Input label='People Preference' readOnly value={_defaultTo(pet.temp_prefer, '-')}/>
          <Form.Input label='Fears' readOnly value={_defaultTo(pet.temp_any_fears, '-')}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='History of  Biting' readOnly value={pet.temp_bitten_human ? 'Yes' : 'No'}/>
          <Form.Input label='People' readOnly value={pet.temp_test_result ? 'Yes' : 'No'}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='Dogs' readOnly value={pet.temp_dog_fights ? 'Yes' : 'No'}/>
          <Form.Input label='Fence Jumping' readOnly value={pet.temp_jumped_fences ? 'Yes' : 'No'}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='Can Share Water Bowl' readOnly value={pet.temp_shared_water_bowls ? 'Yes' : 'No'}/>
          <Form.Field/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>HEALTH</Header>
        <Form.Group widths='equals'>
          <Form.Input label='Medical Restrictions' readOnly value={_defaultTo(pet.health_medical_restrictions, '-')}/>
          <Form.Input label='Allergies' readOnly value={pet.health_is_allergic ? 'Yes' : 'No'}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='Flea or Tick Preventative' readOnly value={pet.health_flea_tick_preventive ? 'Yes' : 'No'}/>
          <Form.Input label='Hearthworm Presentative' readOnly value={pet.health_heartworm_preventive ? 'Yes' : 'No'}/>
        </Form.Group>
        <Header as='h6' className='section-header' color='blue'>FEEDING</Header>
        <Form.Group widths='equals'>
          <Form.Input label='Type of food' readOnly value={pet.feed_type_of_food || '-'}/>
          <Form.Input label='Quantity' readOnly value={pet.feed_quantity || '-'}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='Specials Directions' readOnly value={pet.feed_special_directions || '-'}/>
          <Form.Input label='Water' readOnly value={pet.hesitate_water ? 'Yes' : 'No'}/>
        </Form.Group>
        <Form.Group widths='equals'>
          <Form.Input label='Peanut Butter' readOnly value={pet.hesitate_peanut_butter ? 'Yes' : 'No'}/>
          <Form.Input label='Wet Food' readOnly value={pet.hesitate_wet_food ? 'Yes' : 'No'}/>
        </Form.Group>
      </Form>

    </div>
  )
}

Show.propTypes = { petDetail: PropTypes.shape({}) }

Show.defaultProps = { petDetail: { item: {} } }

export default Show
