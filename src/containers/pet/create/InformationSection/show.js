import React, { useMemo ,useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Container, Form, Header, Grid, Label } from 'semantic-ui-react'
import moment from 'moment'

import SizeTypes from '@lib/constants/SizeTypes'
import { VaccinationStatus, TemperamentPeoplePreference } from '@lib/constants/pet'

import petDetailDuck from '@reducers/pet/detail'
import petRetireReasonDuck from '@reducers/pet/retire-reason'

function PetInformationShow({ petDetail, petRetireReason, ...props }) {
  const { item: pet } = petDetail

  const [ ActiveInfoItem, setActiveInfoItem ] = useState('Pet')

  const _handleEditBtnClick = () => {
    props.setPet(pet, 'UPDATE')
  }

  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const selectedRetireReason = useMemo(() => {
    return petRetireReason.items.find(item => item.id === pet.reason)
  }, [ petRetireReason.status, petDetail.status ])

  const vaccinationStatus = VaccinationStatus[pet.summary.vaccination_request ? 'requested' : pet.summary.vaccination_status]

  // console.log('selectedRetire Reason')
  // console.log(selectedRetireReason)
  // console.log('vaccinationStatus')
  // console.log(vaccinationStatus)
  // console.log('temperament')
  // console.log(TemperamentPeoplePreference)
  return (
    <Container className='pet-information-section' fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column mobile={11} verticalAlign='middle'>
          <Header as='h2'>Pet Info</Header>
        </Grid.Column>
        <Grid.Column mobile={5} textAlign='right'>
          <Button
            basic color='teal' icon='edit outline'
            onClick={_handleEditBtnClick}/>
        </Grid.Column>
      </Grid>
      <div className='mh28 mv32 div-pet-btn-info'>
        <Button
          basic={ActiveInfoItem !== 'Pet'} color='teal'
          content='Pet Information' name='Pet'
          onClick={_handleInfoItemClick}/>
        <Button
          basic={ActiveInfoItem !== 'Temperament'} color='teal'
          content='Temperament' name='Temperament'
          onClick={_handleInfoItemClick}/>
        <Button
          basic={ActiveInfoItem !== 'Health'} color='teal'
          content='Health' name='Health'
          onClick={_handleInfoItemClick}/>
      </div>

      <Form className='petkennect-profile-body-content'>
        {ActiveInfoItem === 'Pet'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>Basic Information</Header>
            <Form.Group widths={2}>
              <Form.Input label='Pet name' readOnly value={pet.name ? pet.name :  '-'}/>
              <Form.Input label='Date of Birth' readOnly value={(pet.born_at && moment(pet.born_at).format('MM/DD/YYYY')) || '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Breed' readOnly value={pet.breed_name ? pet.breed_name : '-'}/>
              <Form.Input label='Size' readOnly value={SizeTypes[petDetail.item.size] ? SizeTypes[petDetail.item.size] : '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Sex' readOnly value={pet.sex === 'F' ? 'Female' : 'Male'}/>
              <Form.Input label='Altered' readOnly value={pet.altered ? 'Yes' : 'No'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Retired' readOnly value={pet.retired ? 'Yes' : 'No'}/>
              {
                pet.retired && pet.reason && (
                  <Form.Input label='Reason' readOnly value={selectedRetireReason.name ? selectedRetireReason.name : '-'}/>
                )
              }
            </Form.Group>

            <Form.Group widths={2}>
              <Form.Input label='Vaccination Status' readOnly value={vaccinationStatus ? vaccinationStatus.text : '-'}/>
              <Form.Input label='Received Dog From' readOnly value={pet.info_received_from ? pet.info_received_from :  '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Created At' readOnly value={petDetail.item.created_at ? (new Date(petDetail.item.created_at).toLocaleString('en-US')) : '-'}/>
              <Form.Input label='Created By' readOnly value={`${pet.employee_first_name || ''} ${pet.employee_last_name || ''}`}/>
            </Form.Group>

            <Header as='h6' className='section-header' color='blue'>APPEARANCE</Header>
            <Form.Group widths={2}>
              <Form.Input
                label='Weight' labelPosition='right' readOnly
                value={pet.weight ? pet.weight :  '-'}>
                <input/>
                <Label content='lbs'/>
              </Form.Input>
              <Form.Input label='Coloring/Markings' readOnly value={pet.info_coloring ? pet.info_coloring :  '-'}/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Temperament'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>TEMPERAMENT</Header>
            <Form.Group widths={2}>
              <Form.Input label='Housebroken' readOnly value={pet.info_housebroken ? 'Yes' : 'No'}/>
              <Form.Input label='Crate Trained' readOnly value={pet.info_crate_trained ? 'Yes' : 'No'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Has Received Training?' readOnly value={pet.info_formal_training ? 'Yes' : 'No'}/>
              <Form.Input label='Overall Temperament' readOnly value='-'/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Gender Preference' readOnly value={TemperamentPeoplePreference.pet ? TemperamentPeoplePreference.pet.temp_prefer : '-'}/>
              <Form.Input label='Fears' readOnly value={pet.temp_any_fears ? pet.temp_any_fears :  '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Bitten Humans' readOnly value={pet.temp_test_result ? 'Yes' : 'No'}/>
              <Form.Input label='Involved in Dog Fights' readOnly value={pet.temp_dog_fights ? 'Yes' : 'No'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Fence Jumping' readOnly value={pet.temp_jumped_fences ? 'Yes' : 'No'}/>
              <Form.Input label='Shared Water Bowl' readOnly value={pet.temp_shared_water_bowls ? 'Yes' : 'No'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Food Aggressive' readOnly value={pet.not_defined ? 'Yes' : 'No'}/>
              <Form.Input label='Toy Aggressive' readOnly value={pet.not_defined ? 'Yes' : 'No'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Leash Reactive' readOnly value={pet.not_defined ? 'Yes' : 'No'}/>
            </Form.Group>

            <Form.Group widths='equal'>
              <Form.TextArea label='Other Notes' readOnly value={pet.not_defined ? 'Yes' : 'No'}/>
            </Form.Group>
            <Header as='h6' className='section-header' color='blue'>GROUP PLAY</Header>
            <Form.Group widths={2}>
              <Form.Input label='Eligibility' readOnly value={pet.not_defined ? pet.not_defined : '-'}/>
              {
                pet.not_defined && (
                  <Form.Input label='Ineligible Reason' readOnly value={pet.not_defined ? pet.not_defined : '-'}/>
                )
              }
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Date of Testing' readOnly value={pet.not_defined ? pet.not_defined : '-'}/>
              <Form.Input label='Link to Day Care Evaluation Results' readOnly value={pet.not_defined ? pet.not_defined :   '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Attended Day Care Previously' readOnly value={pet.temp_daycare ? 'Yes' : 'No'}/>
              {
                pet.temp_daycare && (
                  <Form.Input label='Previus Day Care' readOnly value={pet.temp_daycare_where ? pet.temp_daycare_where :  '-'}/>
                )
              }
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Removed from Another Day Care' readOnly value={pet.not_defined ? pet.not_defined :  '-'}/>
              <Form.Input label='Reason for Removal' readOnly value={pet.not_defined ? pet.not_defined  : '-'}/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Health'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>HEALTH</Header>
            <Form.Group widths='equal'>
              <Form.TextArea label='Medical Restrictions' readOnly value={pet.health_medical_restrictions ? pet.health_medical_restrictions :   '-'}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='Allergies' readOnly value={pet.health_is_allergic ? 'Yes' :  'No'}/>
              {
                pet.health_is_allergic && (
                  <Form.Input label='Allergies description' readOnly value={pet.health_allergic_description ? pet.health_allergic_description :  '-'}/>
                )
              }
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input label='On Flea or Tick Preventative' readOnly value={pet.health_flea_tick_preventive ? 'Yes' : 'No'}/>
              <Form.Input label='On Heartworm Preventative' readOnly value={pet.health_heartworm_preventive ? 'Yes' : 'No'}/>
            </Form.Group>
            <Header as='h6' className='section-header' color='blue'>FEEDING</Header>
            <Form.Group widths={2}>
              <Form.Input label='Type of Food' readOnly value={pet.not_defined ? pet.not_defined :  '-'}/>
              <Form.Input label='Quantity' readOnly value={pet.not_defined ? pet.not_defined :  '-'}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.TextArea label='Special Instructions' readOnly value={pet.not_defined ? pet.not_defined :   '-'}/>
            </Form.Group>
            <Header as='h6' className='section-header' color='blue'>IF PET HESITATES TO EAT, ADD:</Header>
            <Form.Group widths={2}>
              <Form.Input label='Water' readOnly value={pet.hesitate_water ? 'Yes' : 'No'}/>
              <Form.Input label='Peanut Butter' readOnly value={pet.hesitate_peanut_butter ? 'Yes' : 'No'}/>
              <Form.Input label='Wet Food' readOnly value={pet.hesitate_wet_food ? 'Yes' : 'No'}/>
            </Form.Group>
            <Header as='h6' className='section-header' color='blue'>MEDICATION</Header>
            <Form.Group widths='equal'>
              <Form.Input label='Type of Medication' readOnly value={pet.not_defined ? pet.not_defined :   '-'}/>
              <Form.Input label='Reason' readOnly value={pet.not_defined ? pet.not_defined :  '-'}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input label='Amount' readOnly value={pet.not_defined ? pet.not_defined :   '-'}/>
              <Form.Input label='Schedule' readOnly value={pet.not_defined ?  pet.not_defined :  '-'}/>
            </Form.Group>
          </>
        )}
      </Form>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      petDetail      : petDetailDuck.selectors.detail(state),
      petRetireReason: petRetireReasonDuck.selectors.list(state)
    }), {
      setPet: petDetailDuck.creators.setItem
    })
)(PetInformationShow)
