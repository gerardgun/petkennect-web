import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Checkbox, Header, Form, Input, Select } from 'semantic-ui-react'
import moment from 'moment'
import _get from 'lodash/get'
import * as Yup from 'yup'

import PetBreedForm from '@containers/pet-breed/create'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'
import petBreedDuck from '@reducers/pet/breed'
import petRetireReasonDuck from '@reducers/pet/retire-reason'
import petBreedDetailDuck from '@reducers/pet/breed/detail'

function Edit(props) {
  const {
    petDetail,
    petBreed,
    petBreedDetail,
    petRetireReason,
    error,
    handleSubmit,
    initialized,
    reset
  } = props

  useEffect(()=> {
    props.getPetBreeds()
    props.getPetRetireReasons()
  },[])

  useEffect(()=> {
    if(petBreedDetail.status === 'POSTED')
      props.getPetBreeds()
  },[ petBreedDetail.status ])

  useEffect(() => {
    if(petDetail.status === 'GOT' && !initialized) props.initialize(petDetail.item)
  }, [ petDetail.status ])

  const _handleBreedChange = e => {
    e.stopPropagation()
    props.setBreedItem(null, 'CREATE')
  }

  return (
    <div className='ph40 pv32'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Field component='input' name='id' type='hidden'/>
        <Header as='h6' className='section-header mt36' color='blue'>BASIC INFORMATION</Header>
        <Form.Group widths='equal'>

          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Input}
            label='Pet Name'
            name='name'
            placeholder='Enter name'
            required/>
          <Field
            component={FormField}
            control={Input}
            label='Date of birth (Refer)'
            name='born_at'
            type='date'/>

        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Breed'
            name='breed'
            options={[
              ...petBreed.items.map(_petBreed => ({
                key  : _petBreed.id ,
                value: _petBreed.id ,
                text : _petBreed.name
              })),
              {
                key      : 'NEW_BREED' ,
                value    : -1 ,
                text     : 'New Breed',
                onClick  : _handleBreedChange,
                className: 'text-teal'
              }
            ]}
            placeholder='Select breed'
            required
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Select}
            label='Size'
            name='size'
            options={[
              { key: 1, value: 'S', text: 'Small' },
              { key: 2, value: 'M', text: 'Medium' },
              { key: 3, value: 'L', text: 'Large' },
              { key: 4, value: 'G', text: 'Giant' }
            ]}
            placeholder='Select size'
            selectOnBlur={false}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Sex'
            name='sex'
            options={[
              { key: 1, value: 'M', text: 'Male' },
              { key: 2, value: 'F', text: 'Female' }
            ]}
            placeholder='Select sex'
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Input}
            label='Altered'
            name='altered'
            placeholder='Enter altered'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            label='Vaccination' placeholder='-' readOnly
            value={_get(petDetail, 'item.summary.vaccination_status')}/>
          <Field
            className='flex align-center'
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Retired'
            name='retired'
            parse={Number}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          {
            props.hasRetiredChecked && (
              <Field
                component={FormField}
                control={Select}
                label='Reason'
                name='reason'
                options={
                  petRetireReason.items.map(item => ({
                    key  : item.id ,
                    value: item.id ,
                    text : item.name
                  }))
                }
                placeholder='Select reason'
                required
                search
                selectOnBlur={false}/>
            )
          }

        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Received dog from'
            name='info_received_from'
            placeholder='Enter received dog from'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Housebroken'
            name='info_housebroken'
            parse={Number}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Create trained'
            name='info_crate_trained'
            parse={Number}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Formal training'
            name='info_formal_training'
            parse={Number}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Created at</label>
            <input
              placeholder='Owner name' readOnly type='date'
              value={(petDetail.item.created_at && moment(petDetail.item.created_at).format('YYYY-MM-DD')) || null}/>
          </Form.Field>
          <Form.Field>
            <label>Created by</label>
            <input readOnly value={`${petDetail.item.employee_first_name || ''} ${petDetail.item.employee_last_name || ''}`}/>
          </Form.Field>
        </Form.Group>

        <Header as='h6' className='section-header mt36' color='blue'>APPEARANCE</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Weight (lbs)'
            name='weight'
            placeholder='Enter weight'
            type='number'/>
          <Field
            component={FormField}
            control={Input}
            label='Coloring'
            name='info_coloring'
            placeholder='Enter coloring'/>

        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Markings'
            name='markings'
            placeholder='Enter markings'/>
          <Form.Field/>
        </Form.Group>

        <Header as='h6' className='section-header mt36' color='blue'>HESITATES TO EAT</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Elegible'
            name='hesitate_elegible'
            parse={Number}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Input}
            label='Reason for No'
            name='hesitate_reason_for_no'
            placeholder='Enter reason for no'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Date of Testing'
            name='hesitate_date_for_testing'
            type='date'/>
          <Field
            component={FormField}
            control={Input}
            label='Link to Day Camp Evaluations results'
            name='hesitate_link_to_day_camp'
            placeholder='Enter link'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            label='Attended  Day Care Previusly'
            name='temp_daycare'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Input}
            label='Previus Day Care'
            name='temp_daycare_where'
            placeholder='Enter where'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            label='Ever Removed from Another Day Care'
            name='daycare_removed'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Input}
            label='Reason for Removal'
            name='daycare_removed_reason'
            placeholder='Enter reason for removal'/>
        </Form.Group>

        <Header as='h6' className='section-header mt36' color='blue'>TEMPERAMENT</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='People Preference'
            name='temp_prefer'
            options={[
              { key: 1, value: true, text: 'Men' }, // backend issue
              { key: 2, value: false, text: 'Women' }
            ]}
            placeholder='Select preference'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Input}
            label='Fears'
            name='temp_any_fears'
            placeholder='Enter fears'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Bitten humans'
            name='temp_bitten_human'
            parse={Number}
            placeholder='Enter bitten human'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Select}
            label='People'
            name='temp_test_result'
            options={[
              { key: 1, value: true, text: 'Yes' },
              { key: 2, value: false, text: 'No' }
            ]}
            placeholder='Select result'
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Dogs'
            name='temp_dog_fights'
            parse={Number}
            placeholder='Enter dog fights'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Fence Jumping'
            name='temp_jumped_fences'
            parse={Number}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Can Share Water Bowl'
            name='temp_shared_water_bowls'
            parse={Number}
            type='checkbox'/>
          <Form.Field/>
        </Form.Group>

        <Header as='h6' className='section-header mt36' color='blue'>HEALTH</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Medical restrictions'
            name='health_medical_restrictions'
            placeholder='Enter medical restrictions'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Allergies'
            name='health_is_allergic'
            parse={Number}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Flea or Tick Preventative'
            name='health_flea_tick_preventive'
            parse={Number}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Hearthworm Presentative'
            name='health_heartworm_preventive'
            parse={Number}
            type='checkbox'/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>FEEDING</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Type of food'
            name='feed_type_of_food'
            placeholder='Enter type of food'/>
          <Field
            component={FormField}
            control={Input}
            label='Quantity'
            name='feed_quantity'
            placeholder='Enter quantity'
            type='number'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Specials Directions'
            name='feed_special_directions'
            placeholder='Enter special directions'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Water'
            name='hesitate_water'
            parse={Number}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Peanut butter'
            name='hesitate_peanut_butter'
            parse={Number}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Wet food'
            name='hesitate_wet_food'
            parse={Number}
            type='checkbox'/>
        </Form.Group>

        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </Form>
      <PetBreedForm/>
    </div>
  )
}

export default compose(
  connect(
    state => {
      const petDetail = petDetailDuck.selectors.detail(state)

      return {
        petDetail,
        petBreed         : petBreedDuck.selectors.list(state),
        petBreedDetail   : petBreedDetailDuck.selectors.detail(state),
        petRetireReason  : petRetireReasonDuck.selectors.list(state),
        // for redux form
        initialValues    : petDetail.item,
        hasRetiredChecked: Boolean(formValueSelector('pet-edit-information')(state, 'retired'))
      }
    },
    {
      getPetBreeds       : petBreedDuck.creators.get,
      getPetRetireReasons: petRetireReasonDuck.creators.get,
      setBreedItem       : petBreedDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form            : 'pet-edit-information',
    destroyOnUnmount: true,
    validate        : values  => {
      const schema = {
        name                       : YupFields.name,
        breed                      : YupFields.num_required,
        info_crate_trained         : Yup.mixed().required(),
        info_housebroken           : Yup.mixed().required(),
        info_formal_training       : Yup.mixed().required(),
        health_flea_tick_preventive: Yup.mixed().required(),
        reason                     : Yup.mixed().when('retired', (retired, schema) => (retired ? schema.required('The reason is required') : schema.nullable()))
        // daycare_attended           : Yup.mixed().required(),
        // daycare_removed            : Yup.mixed().required()
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(Edit)
