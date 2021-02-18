import React, { useEffect, useMemo } from 'react'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Checkbox, Grid, Form, Header, Input, Select } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import RadioGroup from '@components/Common/RadioGroup'
import { syncValidate } from '@lib/utils/functions'
import { booleanOptions } from '@lib/constants'

import petDetailDuck from '@reducers/pet/detail'
import petBreedDuck from '@reducers/pet/breed'

const formId = 'pet-form'

const PetForm = props => {
  const {
    petBreed,
    error, handleSubmit, reset // redux-form
  } = props

  useEffect(() => {
    props.getPetBreeds()
  }, [])

  const petBreedOptions = useMemo(() => {
    return petBreed.items.map(item => ({
      key  : item.id,
      value: item.id,
      text : item.name
    }))
  }, [ petBreed.status ])

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form id={formId} onReset={reset} onSubmit={handleSubmit}>
        <Header as='h6' className='section-header' color='blue'>Basic Information</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Name'
            name={'name'}
            placeholder='Enter name'
            required/>
          <Field
            component={FormField}
            control={Select}
            label='Sex'
            name={'sex'}
            options={[
              { key: 1, value: 'M', text: 'Male' },
              { key: 2, value: 'F', text: 'Female' }
            ]}
            placeholder='Select sex'
            required
            selectOnBlur={false}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Select}
            label='Breed'
            name={'breed'}
            options={petBreedOptions}
            placeholder='Select breed'
            required
            search
            selectOnBlur={false}/>
          <Field
            component={FormField}
            control={Input}
            fluid
            label='Birthday'
            name={'born_at'}
            placeholder='Enter Birthday'
            required
            type='date'/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            fluid
            label='Coloring/Markings'
            name={'info_coloring'}
            placeholder='Enter Coloring/Markings'
            required/>
          <Field
            component={FormField}
            control={Input}
            label='Weight'
            name={'weight'}
            placeholder='Enter weight in lbs'
            required/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Is your dog spayed/neutered?'
            name={'fixed'}
            options={booleanOptions}
            required/>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Is your dog housebroken?'
            name={'info_housebroken'}
            options={booleanOptions}
            required/>
        </Form.Group>

        <Form.Group widths={2}>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Is your dog crate trained?'
            name={'info_crate_trained'}
            options={booleanOptions}
            required/>
        </Form.Group>

        <Form.Group widths={2}>
          <Field
            component={FormField}
            control={Input}
            label='Where did you get your dog from?'
            name={'info_received_from'}/>
          <Field
            component={FormField}
            control={Input}
            label='Is your dog scared of anything? If so, explain'
            name={'temp_any_fears'}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Behavioral</Header>

        <Form.Group widths={2}>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Does your dog have a preference to males or females?'
            name={'temp_prefer'}
            options={[
              { key: 'men', value: 'M', text: 'Men' },
              { key: 'women', value: 'W', text: 'Women' },
              { key: 'neither', value: 'N', text: 'No preference' }
            ]}/>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Has your dog ever shared a water bowl?'
            name={'temp_shared_water_bowls'}
            options={booleanOptions}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Has your dog ever jumped a fence?'
            name={'temp_jumped_fences'}
            options={booleanOptions}/>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Has your dog ever been through formal training?'
            name={'info_formal_training'}
            options={booleanOptions}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Has your dog ever been to another Day Care?'
            name={'temp_daycare'}
            options={booleanOptions}/>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Has your dog bitten a human?'
            name={'temp_bitten_human'}
            options={booleanOptions}/>
        </Form.Group>

        <Form.Group widths={2}>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Has your dog been in a dog fight?'
            name={'temp_dog_fights'}
            options={booleanOptions}/>
        </Form.Group>

        <Header as='h6' className='section-header' color='blue'>Health</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='Are there any health restrictions or concerns'
            name={'health_restrictions'}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={RadioGroup}
            label='Allergies'
            name={'health_is_allergic'}
            options={booleanOptions}/>
          <Field
            component={FormField}
            control={Input}
            fluid
            label='If you answered yes, please list all allergies'
            name={'health_allergic_description'}/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={Input}
            label='List any medical restrictions'
            name={'health_medical_restrictions'}/>
          <Field
            component={FormField}
            control={Input}
            label='Is there anything else we should know?'
            name={'description'}/>
        </Form.Group>

        <Form.Group>
          <Form.Field>
            <label>If boarding and your dog hesitates to eat, can we add the following, please check all that apply</label>
            <Grid columns='equal'>
              <Grid.Column>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  label='Peanut Butter'
                  name={'hesitate_peanut_butter'}
                  type='checkbox'/>
              </Grid.Column>
              <Grid.Column>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  label='Wet Food'
                  name={'hesitate_wet_food'}
                  type='checkbox'/>
              </Grid.Column>
              <Grid.Column>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  label='Water'
                  name={'hesitate_water'}
                  type='checkbox'/>
              </Grid.Column>
            </Grid>
          </Form.Field>
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

        {/* <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              onClick={_handleCancelBtnClick}
              type='button'/>
            <Button
              className='w120'
              color='teal'
              content='Continue'
              type='submit'/>
          </Form.Field>
        </Form.Group> */}
      </Form>
    </>
  )
}

export default compose(
  connect(
    ({ ...state }) => {
      const petDetail = petDetailDuck.selectors.detail(state)

      return {
        petBreed           : petBreedDuck.selectors.list(state),
        // redux-form
        initialValues      : petDetail.item,
        referred           : formValueSelector(formId)(state, 'referred'),
        interested_services: formValueSelector(formId)(state, 'interested_services')
      }
    },
    {
      getPetBreeds: petBreedDuck.creators.get
    }
  ),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        name              : Yup.string().required('Name is required'),
        sex               : Yup.string().required('Sex is required'),
        breed             : Yup.mixed().required('Breed is required'),
        born_at           : Yup.string().required('Birthday is required'),
        info_coloring     : Yup.string().required('This field is required'),
        weight            : Yup.number().required('Weight is required'),
        fixed             : Yup.boolean().required('Choose an option'),
        info_housebroken  : Yup.boolean().required('Choose an option'),
        info_crate_trained: Yup.boolean().required('Choose an option')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(PetForm)
