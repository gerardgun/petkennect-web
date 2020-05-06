import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Divider, Form, Header, Tab } from 'semantic-ui-react'
import * as Yup from 'yup'

import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import YupFields from '@lib/constants/yup-fields'
import { syncValidate } from '@lib/utils/functions'

import clientPetDetailDuck from '@reducers/client/pet/detail'
import petBreedDuck from '@reducers/pet/breed'

const FormInformation = props => {
  const {
    clientPetDetail,
    petBreed,
    getPetBreeds,
    error, handleSubmit, initialized, reset // redux-form
  } = props

  useEffect(()=> {
    getPetBreeds()
  },[])
  useEffect(() => {
    if(clientPetDetail.status === 'GOT' && !initialized) props.initialize(clientPetDetail.item)
  }, [ clientPetDetail.status ])

  return (
    <Tab.Pane className='form-primary-segment-tab' loading={clientPetDetail.status === 'GETTING'}>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={props.form} onReset={reset} onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Field
            autoComplete='off'
            autoFocus
            component={FormField}
            control={Form.Input}
            label='Name *'
            name='name'
            placeholder='Enter name'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Breed *'
            name='breed'
            options={petBreed.items.map(_petBreed => ({
              key  : _petBreed.id ,
              value: _petBreed.id ,
              text : _petBreed.name
            }))}
            placeholder='Select breed'
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Date of birth'
            name='borns_at'
            type='date'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Weight'
            name='weight'
            placeholder='Enter weight'
            type='number'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Sex'
            name='sex'
            options={[
              { key: 1, value: 1, text: 'Male' },
              { key: 2, value: 2, text: 'Female' }
            ]}
            placeholder='Select sex'
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Dog size'
            name='size'
            options={[
              { key: 1, value: 1, text: 'Small' },
              { key: 2, value: 2, text: 'Medium' },
              { key: 3, value: 3, text: 'Large' },
              { key: 4, value: 4, text: 'Giant' }
            ]}
            placeholder='Select size'
            selectOnBlur={false}/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Select}
            label='Reason'
            name='reason'
            options={[
              { key: 1, value: 1, text: 'Owner Surrender' },
              { key: 2, value: 2, text: 'Deceased' },
              { key: 3, value: 3, text: 'Temporary Home' },
              { key: 4, value: 4, text: 'Other' }
            ]}
            placeholder='Select reason'
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Standing Reservation'
            name='standing_reservation'
            options={[
              { key: 1, value: 1, text: 'Yes' },
              { key: 2, value: 2, text: 'No' }
            ]}
            placeholder='Select option'
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Form.Input}
            label='&nbsp;'
            name='standing_reservation_days'
            placeholder='Days'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Special instructions'
            name='special_instructions'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Behavioral'
            name='behaviorial_comments'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Fixed'
            name='fixed'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Retire'
            name='retired'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Vaccinations</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Rabies'
            name='vac_rabies_date'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Bordetella'
            name='vac_bortedella_date'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Notification set on'
            name='vac_notification_sent_on'
            type='date'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='DHLPP'
            name='vac_dhlpp_date'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Neg. Fecal'
            name='vac_neg_fecal_date'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Influenza'
            name='vac_influenza_date'
            type='date'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='All current'
            name='vac_all_current'
            type='checkbox'/>
        </Form.Group>

        <Divider/>
        <Header as='h4'>Temperament</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Tested'
            name='temp_test_date'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Select}
            label='Result'
            name='temp_test_result'
            options={[
              { key: 1, value: 1, text: 'Pass' },
              { key: 2, value: 2, text: 'Fail' }
            ]}
            placeholder='Select result'
            selectOnBlur={false}/>
          <Form.Field/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.TextArea}
            label='Temperament test observations'
            name='temp_test_observations'
            placeholder='Enter description'/>
        </Form.Group>
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 1'
            name='temp_strikes.date_strike_1'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 2'
            name='temp_strikes.date_strike_2'
            type='date'/>
          <Field
            component={FormField}
            control={Form.Input}
            label='Strike 3'
            name='temp_strikes.date_strike_3'
            type='date'/>
        </Form.Group>
        <Form.Group>
          <Field
            component={FormField}
            control={Form.Checkbox}
            label='Daycare'
            name='temp_daycare'
            type='checkbox'/>
          <Field
            component={FormField}
            control={Form.Checkbox}
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
      const clientPetDetail = clientPetDetailDuck.selectors.detail(state)

      return {
        clientPetDetail,
        initialValues: clientPetDetail.item,
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

