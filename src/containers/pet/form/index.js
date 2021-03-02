import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Field, formValueSelector, FieldArray, reduxForm } from 'redux-form'
import { Checkbox, Header, Form, Button, Segment, Label, Input, Select, TextArea } from 'semantic-ui-react'

import loadable from '@loadable/component'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { TemperamentPeoplePreferenceOptions, VaccinationStatus } from '@lib/constants/pet'
import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import { useDebounce } from '@hooks/Shared'

import clientDuck from '@reducers/client'
import clientDetailDuck from '@reducers/client/detail'
import petDetailDuck from '@reducers/pet/detail'
import petBreedDuck from '@reducers/pet/breed'
import petRetireReasonDuck from '@reducers/pet/retire-reason'
import petBreedDetailDuck from '@reducers/pet/breed/detail'
import trainingMethodDetailDuck from '@reducers/training-method/detail'

const PetBreedForm = loadable(() => import('@containers/pet-breed/create'))
const FormError = loadable(() => import('@components/Common/FormError'))
const  EmailAlert  = loadable(() => import('./email-alert'))

export const formId = 'pet-form'

export const MedicationList = ({ fields, meta: { error, submitFailed } }) => {
  const _handleAddBtnClick = () => fields.push({ ...medicationInitialState })
  const _handleRemoveBtnClick = e => fields.remove(e.currentTarget.dataset.index)

  const medicationInitialState = {
    type_of_medication: '',
    reason            : '',
    amount            : '',
    schedule          : ''
  }

  return (
    <>
      <Segment className='form-primary-segment'>
        {
          fields.map((item, index) => (
            <Form.Group key={index} widths='equal'>
              <Field
                className='cls_medication'
                component={FormField}
                control={Input}
                label='Type of Medication'
                name={`${item}.type_of_medication`}
                placeholder='Enter type of medication'
                required/>
              <Field
                className='cls_medication'
                component={FormField}
                control={Input}
                label='Reason'
                name={`${item}.reason`}
                placeholder='Enter reason'
                required/>
              <Field
                className='cls_medication'
                component={FormField}
                control={Input}
                label='Amount'
                name={`${item}.amount`}
                placeholder='Enter amount'
                required
                type='number'/>
              <Field
                className='cls_medication'
                component={FormField}
                control={Input}
                label='Schedule'
                name={`${item}.schedule`}
                placeholder='Enter schedule'
                required/>
              <Form.Button
                data-index={index} icon='trash alternate outline' label='&nbsp;'
                onClick={_handleRemoveBtnClick}
                type='button'/>
            </Form.Group>
          ))
        }
        <div style={{ textAlign: 'center' }}>
          <Button
            basic
            color='teal'  icon='plus icon'
            onClick={_handleAddBtnClick}
            type='button'/>
        </div>
        {
          submitFailed && error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </Segment>
    </>
  )
}

const booleanOptions = [
  {
    key  : 1,
    value: true,
    text : 'Yes'
  },
  {
    key  : 2,
    value: false,
    text : 'No'
  }
]

function PetForm(props) {
  const {
    client,
    clientDetail,
    selectedClientId,
    petDetail,
    clientsId,
    petBreed,
    petBreedDetail,
    petRetireReason,
    change, error, handleSubmit, reset // redux-form
  } = props

  const petClientId = clientsId != undefined ? clientsId : selectedClientId

  const history = useHistory()
  const { client: clientId } = useParams()
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('Pet')

  useEffect(() => {
    props.getPetBreeds()
    props.getPetRetireReasons()

    if(client.items.length === 0) props.getClients()
  }, [])

  useEffect(() => {
    if(petBreedDetail.status === 'POSTED')
      props.getPetBreeds()
  },[ petBreedDetail.status ])

  const { _handleDebounce } = useDebounce(text => {
    props.getClients({
      search: text
    })
  })

  const _handleClientSearchChange = (_, { searchQuery }) => _handleDebounce(searchQuery)

  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  const _handleNewPetBreedOptionClick = e => {
    e.stopPropagation()

    props.setPetBreed(null, 'CREATE')
  }

  const _handlePetBreedChange = breedId => {
    if(Number.isInteger(breedId)) {
      const breed = petBreed.items.find(({ id }) => id === breedId)

      change('size', breed.size)
    }
  }

  const _handleSubmit = (values) => {
    props.setItemEmail(null, 'READ')
    values = parseFormValues(values)

    if(updating)
      return props.put(values)
        .catch(parseResponseError)
    else
      return props.post(isFromClientProfileModule ? { ...values, client: clientId } : values)
        .then(payload => {
          props.resetItem()

          if(isFromPetsModule)
            history.push(`/pet/${payload.id}`)
          else
            history.push({
              pathname: `/pet/${payload.id}`,
              state   : {
                client         : client.id,
                client_fullname: `${clientDetail.item.first_name} ${clientDetail.item.last_name}`
              }
            })
        })
        .catch(parseResponseError)
  }

  const updating = Boolean(petDetail.item.id)
  const isFromPetsModule = history.location.pathname === '/pet'
  const isFromClientProfileModule = /^\/client\/\d+/.test(history.location.pathname)
  const clientOptions = useMemo(() => {
    return client.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : `${item.first_name} ${item.last_name}`
    }))
  }, [ client.status ])
  const petBreedOptions = useMemo(() => {
    let options = petBreed.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : item.name
    }))

    options.push({
      key      : 'new_breed' ,
      value    : 'new_breed' ,
      text     : 'New Breed',
      className: 'text-teal',
      onClick  : _handleNewPetBreedOptionClick
    })

    return options
  }, [ petBreed.status ])
  const vaccinationStatus = VaccinationStatus[petDetail.item.summary.vaccination_request ? 'requested' : petDetail.item.summary.vaccination_status]

  return (
    <>
      <div className='mv32 div-pet-btn-info'>
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
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
        {ActiveInfoItem === 'Pet'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>BASIC INFORMATION</Header>
            {
              isFromPetsModule && (
                <Form.Group widths={2}>
                  <Field
                    component={FormField}
                    control={Select}
                    disabled={client.status === 'GETTING'}
                    label='Owner'
                    loading={client.status === 'GETTING'}
                    name='client'
                    onSearchChange={_handleClientSearchChange}
                    options={clientOptions}
                    placeholder='Search client'
                    required
                    search
                    selectOnBlur={false}/>
                </Form.Group>
              )
            }
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
                label='Date of Birth'
                name='born_at'
                type='date'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Breed'
                name='breed'
                onChange={_handlePetBreedChange}
                options={petBreedOptions}
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
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Altered'
                name='fixed'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input
                label='Vaccination Status' placeholder='-' readOnly
                value={vaccinationStatus ? vaccinationStatus.text : '-'}/>
              <Field
                component={FormField}
                control={Input}
                label='Received Dog From'
                name='info_received_from'
                placeholder='Enter received dog from'/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                label='Retired'
                name='retired'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <>
                {
                  props.hasRetiredChecked && (
                    <Field
                      component={FormField}
                      control={Select}
                      label='Reason'
                      name='reason'
                      options={
                        petRetireReason.items.map(item => ({
                          key  : item.id,
                          value: item.id,
                          text : item.name
                        }))
                      }
                      placeholder='Select reason'
                      required
                      search
                      selectOnBlur={false}/>

                  )
                }
              </>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                label='Created At' placeholder='-' readOnly
                value={petDetail.item.created_at ? (new Date(petDetail.item.created_at).toLocaleString('en-US')) : null}/>
              <Form.Input
                label='Created By' placeholder='-' readOnly
                value={`${petDetail.item.employee_first_name || ''} ${petDetail.item.employee_last_name || ''}`}/>
            </Form.Group>

            <Header as='h6' className='section-header' color='blue'>APPEARANCE</Header>
            <Form.Group widths='equal'>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='Weight'
                labelPosition='right'
                name='weight'
                placeholder='Enter weight'
                required
                type='number'>
                <input/>
                <Label content='lbs'/>
              </Field>
              <Field
                component={FormField}
                control={Input}
                label='Color'
                name='info_coloring'
                placeholder='Enter coloring'/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Input}
                disabled
                label='Markings'
                name='markings'
                placeholder='Enter markings'/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Temperament'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>TEMPERAMENT</Header>

            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Housebroken'
                name='info_housebroken'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Crate trained'
                name='info_crate_trained'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Has Received Training?'
                name='info_formal_training'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Input}
                label='Overall Temperament'
                name='overall_temperament'
                placeholder='Enter overall temperament'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Gender Preference'
                name='temp_prefer'
                options={TemperamentPeoplePreferenceOptions}
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
                control={Select}
                label='Bitten Humans'
                name='temp_bitten_human'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Involved in Dog Fights'
                name='temp_dog_fights'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Fence Jumping'
                name='temp_jumped_fences'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Shared Water Bowl'
                name='temp_shared_water_bowls'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Select}
                label='Food Aggressive'
                name='food_aggressive'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Toy Aggressive'
                name='toy_aggressive'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                label='Leash Reactive'
                name='Leash Reactive'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextArea}
                label='Other Notes'
                name='other_notes'
                placeholder='Enter other notes'/>
            </Form.Group>
            <Header as='h6' className='section-header' color='blue'>Group Play</Header>

            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                label='Eligibility'
                name='hesitate_elegible'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <>
                {
                  props.hasEligibilityChecked === false && (
                    <Field
                      component={FormField}
                      control={Input}
                      label='Ineligible Reason'
                      name='hesitate_reason_for_no'
                      placeholder='Enter reason for no'/>

                  )
                }
              </>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                disabled
                label='Date of Testing'
                name='hesitate_date_for_testing'
                type='date'/>
              <Field
                component={FormField}
                control={Input}
                disabled
                label='Linking to a document in the storage diectly'
                name='hesitate_link_to_day_camp'
                placeholder='Enter link'/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                label='Attended Day Care Previously'
                name='temp_daycare'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              {
                props.hasTempDaycareChecked && (
                  <Field
                    component={FormField}
                    control={Input}
                    label='Previus Day Care'
                    name='temp_daycare_where'
                    placeholder='Enter where'/>
                )
              }
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                disabled
                label='Removed from Another Day Care'
                name='daycare_removed'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Input}
                disabled
                label='Reason for Removal'
                name='daycare_removed_reason'
                placeholder='Enter reason for removal'/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Health'  && (
          <>
            <Header as='h6' className='section-header' color='blue'>HEALTH</Header>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextArea}
                label='Medical Restrictions'
                name='health_medical_restrictions'
                placeholder='Enter medical restrictions'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='Allergies (If YES - please describe)'
                name='health_is_allergic'
                placeholder='Select option'/>
              <Field
                component={FormField}
                control={Select}
                label='On Flea or Tick Preventative'
                name='health_flea_tick_preventive'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                label='On Heartworm Preventative'
                name='health_heartworm_preventive'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>

            <Header as='h6' className='section-header' color='blue'>FEEDING</Header>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                disabled
                label='Type of Food'
                name='feed_type_of_food'
                placeholder='Enter type of food'/>
              <Field
                component={FormField}
                control={Input}
                disabled
                label='Quantity'
                name='feed_quantity'
                placeholder='Enter quantity'
                type='number'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextArea}
                disabled
                label='Special Instructions'
                name='feed_special_directions'
                placeholder='Enter special directions'/>
            </Form.Group>
            <label>If pet hesitates to eat, add:</label>
            <Form.Group>
              <Field
                component={FormField}
                control={Checkbox}
                format={Boolean}
                label='Water'
                name='hesitate_water'
                parse={Number}
                type='checkbox'/>
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

            <Header as='h6' className='section-header' color='blue'>MEDICATION</Header>

            <FieldArray
              component={MedicationList}
              name='medication_detail'
              title='Medication Details'/>
          </>
        )}
        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }

        <Field component='input' name='id' type='hidden'/>
      </Form>
      <PetBreedForm/>
      <EmailAlert clientId={petClientId}/>
    </>
  )
}

export default compose(
  connect(
    ({ client, ...state }) => {
      const petDetail = petDetailDuck.selectors.detail(state)
      const { retired, temp_daycare, hesitate_elegible } = formValueSelector(formId)(state, 'retired', 'temp_daycare', 'hesitate_elegible')

      return {
        client,
        petDetail,
        clientDetail         : clientDetailDuck.selectors.detail(state),
        petBreed             : petBreedDuck.selectors.list(state),
        petBreedDetail       : petBreedDetailDuck.selectors.detail(state),
        petRetireReason      : petRetireReasonDuck.selectors.list(state),
        // for redux form
        initialValues        : petDetail.item,
        hasRetiredChecked    : Boolean(retired),
        hasTempDaycareChecked: Boolean(temp_daycare),
        hasEligibilityChecked: Boolean(hesitate_elegible),
        selectedClientId     : formValueSelector(formId)(state, 'client')
      }
    },
    {
      getClients         : clientDuck.creators.get,
      getPetBreeds       : petBreedDuck.creators.get,
      getPetRetireReasons: petRetireReasonDuck.creators.get,
      post               : petDetailDuck.creators.post,
      put                : petDetailDuck.creators.put,
      resetItem          : petDetailDuck.creators.resetItem,
      setItemEmail       : trainingMethodDetailDuck.creators.setItem,
      setPetBreed        : petBreedDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {
        client : Yup.number().required('Owner is required'),
        size   : Yup.mixed().required('Size is required'),
        name   : YupFields.name,
        breed  : YupFields.num_required,
        born_at: Yup.date().max(new Date(), 'Date Birth must be a valid date'),
        reason : Yup.mixed().when('retired', (retired, schema) => (retired ? schema.required('The reason is required') : schema.nullable()))
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetForm)
