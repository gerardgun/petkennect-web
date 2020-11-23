import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Container, Form, Select, Input, Header, TextArea, Checkbox } from 'semantic-ui-react'
import FormField from '@components/Common/FormField'

function AdditionalInformationShow() {
  const [ ActiveInfoItem, setActiveInfoItem ] = useState('Temperament')

  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

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

  return (
    <Container fluid>
      <div className='div-pet-btn-info'>
        <Button
          basic={ActiveInfoItem !== 'Temperament'} color='teal'
          content='Temperament' name='Temperament'
          onClick={_handleInfoItemClick}/>
        <Button
          basic={ActiveInfoItem !== 'Health'} color='teal'
          content='Health' name='Health'
          onClick={_handleInfoItemClick}/>
        <Button
          basic={ActiveInfoItem !== 'DayCareInfo'} color='teal'
          content='Day Care Info' name='DayCareInfo'
          onClick={_handleInfoItemClick}/>
      </div>

      <Form className='mv32 dropdown-width'>
        {ActiveInfoItem === 'Temperament'  && (
          <>
            <Form.Group widths={2}>
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
                label='Crate Trained'
                name='info_crate_trained'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Input}
                label='Overall Temperament'
                name='overall_temperament'
                placeholder='Enter overall temperament'/>
              <Field
                component={FormField}
                control={Input}
                label='Bitten Humans'
                name='temp_bitten_human'
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Input}
                label='Involved in Dog Fights'
                name='temp_dog_fights'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Input}
                label='Fears'
                name='temp_any_fears'
                placeholder='Enter fears'/>
            </Form.Group>
            <Form.Group widths={2}>
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
                control={Input}
                label='Gender Preference'
                name='temp_prefer'
                placeholder='Select preference'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                label='Shared Water Bowl'
                name='temp_shared_water_bowls'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Formal Training'
                name='formal_taining'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
          </>
        )}
        {ActiveInfoItem === 'Health'  && (
          <>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextArea}
                label='Medical Restrictions'
                name='health_medical_restrictions'
                placeholder='Enter medical restrictions'/>
            </Form.Group>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Input}
                label='Allergies/Concerns'
                name='health_is_allergic'
                placeholder='Select option'/>
              <Field
                component={FormField}
                control={Select}
                label='Flea/Tick Prevention'
                name='health_flea_tick_preventive'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Header as='h6' className='section-header' color='blue'>Pet hesitates to eat :</Header>
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

          </>
        )}
        {ActiveInfoItem === 'DayCareInfo'  && (
          <>
            <Form.Group widths={2}>
              <Field
                component={FormField}
                control={Select}
                label='Attend Day Care'
                name='attendDayCare'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
              <Field
                component={FormField}
                control={Select}
                label='Removed From Day Care'
                name='removedFromDayCare'
                options={booleanOptions}
                placeholder='Select option'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={Input}
                label='Reason For Removal'
                name='reasonFromRemoval'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Field
                component={FormField}
                control={TextArea}
                label='Any Other Notes'
                name='anyOtherNotes'/>
            </Form.Group>

          </>
        )}
      </Form>
    </Container>
  )
}

export default compose(
  withRouter,
  connect(
  ),
  reduxForm({
    form              : 'additional-info-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(AdditionalInformationShow)
