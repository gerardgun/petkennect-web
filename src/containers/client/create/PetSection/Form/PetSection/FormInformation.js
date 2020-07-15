import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Checkbox, Divider, Form, Header, Input, Select, Tab, TextArea } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import petDetailDuck from '@reducers/pet/detail'
import petBreedDuck from '@reducers/pet/breed'

const FormInformation = props => {
  const {
    petDetail,
    petBreed,
    getPetBreeds,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(()=> {
    getPetBreeds()
  },[])
  useEffect(() => {
    if(petDetail.status === 'GOT' && !initialized) props.initialize(petDetail.item)
  }, [ petDetail.status ])

  return (
    <Tab.Pane className='form-primary-segment-tab cls-Petform' loading={petDetail.status === 'GETTING'}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Input}
            label='Name'
            name='name'
            placeholder='Enter name'
            required/>
          <Field
            component={FormField}
            control={Select}
            label='Breed'
            name='breed'
            options={petBreed.items.map(_petBreed => ({
              key  : _petBreed.id ,
              value: _petBreed.id ,
              text : _petBreed.name
            }))}
            placeholder='Select breed'
            required
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Input}
            label='Date of birth'
            name='born_at'
            type='date'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Weight'
            name='weight'
            placeholder='Enter weight'
            type='number'/>
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
            control={Select}
            label='Dog size'
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
            label='Reason'
            name='reason'
            options={[
              { key: 1, value: '1', text: 'Owner Surrender' },
              { key: 2, value: '2', text: 'Deceased' },
              { key: 3, value: '3', text: 'Temporary Home' },
              { key: 4, value: '4', text: 'Other' }
            ]}
            placeholder='Select reason'
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Select}
            label='Standing Reservation'
            name='standing_reservation'
            options={[
              { key: 1, value: true, text: 'Yes' },
              { key: 2, value: false, text: 'No' }
            ]}
            placeholder='Select option'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Input}
            label='Days'
            name='standing_reservation_days'
            placeholder='Days'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextArea}
            label='Special instructions'
            name='special_instructions'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextArea}
            label='Behavioral' // backend issue
            name='behaviorial_comments'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Fixed'
            name='fixed'
            parse={Number}
            type='checkbox'/>
          <Field
            component={FormField}
            control={Checkbox}
            format={Boolean}
            label='Retire'
            name='retired'
            parse={Number}
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Vaccinations</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Rabies'
            name='vac_rabies_date'
            type='date'/>
          <Field
            component={FormField}
            control={Input}
            label='Bordetella'
            name='vac_bortedella_date'
            type='date'/>
          <Field
            component={FormField}
            control={Input}
            label='Notification set on'
            name='vac_notification_sent_on'
            type='date'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='DHLPP'
            name='vac_dhlpp_date'
            type='date'/>
          <Field
            component={FormField}
            control={Input}
            label='Neg. Fecal'
            name='vac_neg_fecal_date'
            type='date'/>
          <Field
            component={FormField}
            control={Input}
            label='Influenza'
            name='vac_influenza_date'
            type='date'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Checkbox}
            label='All current'
            name='vac_all_current'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Tested'
            name='tem_test_date'
            type='date'/>
          <Field
            component={FormField}
            control={Select}
            label='Result'
            name='temp_test_result'
            options={[
              { key: 1, value: true, text: 'Pass' },
              { key: 2, value: false, text: 'Fail' }
            ]}
            placeholder='Select result'
            selectOnBlur={false}/>
          <Form.Field/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextArea}
            label='Temperament test observations'
            name='temp_test_observations'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Strike 1'
            name='temp_strikes[0]'
            type='date'/>
          <Field
            component={FormField}
            control={Input}
            label='Strike 2'
            name='temp_strikes[1]'
            type='date'/>
          <Field
            component={FormField}
            control={Input}
            label='Strike 3'
            name='temp_strikes[2]'
            type='date'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Checkbox}
            label='Daycare'
            name='temp_daycare'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Checkbox}
            label='Aggressive'
            name='temp_aggressive'
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
    </Tab.Pane>
  )
}

export default compose(
  connect(
    state => {
      const petDetail = petDetailDuck.selectors.detail(state)

      return {
        petDetail,
        initialValues: petDetail.item,
        petBreed     : petBreedDuck.selectors.list(state)
      }
    }
    ,
    {
      getPetBreeds: petBreedDuck.creators.get
    }
  ),
  reduxForm({
    form            : 'pet-create-information',
    destroyOnUnmount: false,
    validate        : values  => {
      const schema = {
        name : YupFields.name,
        breed: YupFields.num_required
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(FormInformation)

