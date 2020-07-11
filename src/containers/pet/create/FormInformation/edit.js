import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Header, Form } from 'semantic-ui-react'
import moment from 'moment'
import * as Yup from 'yup'

import PetBreedForm from '@containers/pet-breed/create'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import YupFields from '@lib/constants/yup-fields'
import { formatIntToBool, parseBoolToInt, syncValidate } from '@lib/utils/functions'

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

  const clientFullName = `${petDetail.item.client_first_name || ''} ${petDetail.item.client_last_name || ''}`

  return (
    <div className='ph40 pv32'>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Field component='input' name='id' type='hidden'/>
        <Header as='h6' className='form-section-header mt36' color='blue'>BASIC INFORMATION</Header>
        <Form.Group widths='equal'>

          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Name *'
            name='name'
            placeholder='Enter name'/>
          <Form.Field>
            <label>Owner</label>
            <input placeholder='Owner name' readOnly value={clientFullName}/>
          </Form.Field>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            label='Breed *'
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
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Sex'
            name='sex'
            options={[
              { key: 1, value: 'M', text: 'Male' },
              { key: 2, value: 'F', text: 'Female' }
            ]}
            placeholder='Select sex'
            search
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Date of birth (Refer)'
            name='born_at'
            type='date'/>
          <Field
            className='flex align-center'
            component={FormField}
            control={Form.Checkbox}
            format={Boolean}
            label='Fixed'
            name='fixed'
            parse={Number}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            label='Vaccination'
            readOnly value='Current'/>
          <Field
            className='flex align-center'
            component={FormField}
            control={Form.Checkbox}
            format={Boolean}
            label='Retired'
            name='retired'
            parse={Number}
            type='checkbox'/>
        </Form.Group>

        {
          props.hasRetiredChecked && (
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Form.Select}
                label='Reason *'
                name='reason'
                options={
                  petRetireReason.items.map(item => ({
                    key  : item.id ,
                    value: item.id ,
                    text : item.name
                  }))
                }
                placeholder='Select reason'
                search
                selectOnBlur={false}/>
            </Form.Group>
          )
        }

        <Header as='h6' className='form-section-header mt36' color='blue'>APPEARANCE</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Weight (lbs)'
            name='weight'
            placeholder='Enter weight'
            type='number'/>
          <Field
            component={FormField}
            control={Form.Select}
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
            control={Form.Input}
            label='Coloring'
            name='info_coloring'
            placeholder='Enter coloring'/>
          <Form.Field/>
        </Form.Group>

        <Header as='h6' className='form-section-header mt36' color='blue'>TEMPERAMENT</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            label='Day camp result'
            name='temp_test_result'
            options={[
              { key: 1, value: true, text: 'Pass' },
              { key: 2, value: false, text: 'Fail' }
            ]}
            placeholder='Select result'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Prefer'
            name='temp_prefer'
            options={[
              { key: 1, value: true, text: 'Men' }, // backend issue
              { key: 2, value: false, text: 'Women' }
            ]}
            placeholder='Select preference'
            selectOnBlur={false}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Attend other day camp'
            name='temp_daycare'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Where'
            name='temp_daycare_where'
            placeholder='Enter where'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Any Fear'
            name='temp_any_fears'
            placeholder='Enter any fears'/>
          <Form.Field/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Jumped fences'
            name='temp_jumped_fences'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Shared water bowls'
            name='temp_shared_water_bowls'
            parse={parseBoolToInt}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Bitten humans'
            name='temp_bitten_human'
            parse={parseBoolToInt}
            placeholder='Enter bitten human'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Involved in dog fights'
            name='temp_dog_fights'
            parse={parseBoolToInt}
            placeholder='Enter dog fights'
            type='checkbox'/>
        </Form.Group>

        <Header as='h6' className='form-section-header mt36' color='blue'>HEALTH</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Medical restrictions'
            name='health_medical_restrictions'
            placeholder='Enter medical restrictions'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='On heart prevention'
            name='health_heartworm_preventive'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='On flea tick prevention'
            name='health_flea_tick_preventive'
            parse={parseBoolToInt}
            type='checkbox'/>

        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Allergies'
            name='health_is_allergic'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Form.Field/>
        </Form.Group>

        <Header as='h6' className='form-section-header mt36' color='blue'>HESITATES TO EAT</Header>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Water'
            name='hesitate_water'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Peanut butter'
            name='hesitate_peanut_butter'
            parse={parseBoolToInt}
            type='checkbox'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Wet food'
            name='hesitate_wet_food'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Form.Field/>
        </Form.Group>

        <Header as='h6' className='form-section-header mt36' color='blue'>ADITIONAL INFO</Header>
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
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Formal training'
            name='info_formal_training'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Received dog from'
            name='info_received_from'
            placeholder='Enter received dog from'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Crate trained'
            name='info_crate_trained'
            parse={parseBoolToInt}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            format={formatIntToBool}
            label='Housebroken'
            name='info_housebroken'
            parse={parseBoolToInt}
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
