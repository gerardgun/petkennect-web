import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Grid, span, Step,Select, Form, Input } from 'semantic-ui-react'
import loadable from '@loadable/component'

import FormField from '@components/Common/FormField'

import '../styles.scss'

const Medication = loadable(() => import('./../medication'))
const MedicationTime = loadable(() => import('./../medication-time'))
const MedicationMeasurement = loadable(() => import('./../medication-measurement'))
const MedicationUnit = loadable(() => import('./../medication-unit'))
const MedicationReportStatus = loadable(() => import('./../medication-reportStatus'))
const MedicationType = loadable(()=>import('./../medication-type'))

const EditableField = ()=>{
  const [ activeMenuItem, setActiveMenuItem ] = useState('medicationTimes')
  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  return (
    <>
      <Grid>
        <Grid.Column
          className='pb0'
          computer={16} mobile={16} tablet={16}>
          <span className='quick-link-font' color='teal'><b>Medication Charges Setup</b></span>
        </Grid.Column>
        <Grid.Column computer={6} style={{ 'padding-top': '0.9rem' }}>
          <span><b>Do you charge for Medication Adminstration?</b></span>
        </Grid.Column>

        <Grid.Column computer={9} style={{ 'padding-top': '0.1rem' , 'padding-left': '1.2rem' }}>

          <Form.Group >
            <Field
              autoFocus
              component={FormField}
              control={Select}
              name='med_adminstration_charges'
              options={
                [ {
                  key: 1, value: 1, text: 'No Charges Apply'
                },{
                  key: 2, value: 2, text: 'Yes, Per Day '
                },{
                  key: 3, value: 3, text: 'Yes, Per Adminstration Time'
                },{
                  key: 4, value: 4, text: 'Yes, Per Adminstratio For Each Medication'
                } ]
              }
              placeholder='Select Charges'
              required
              selectOnBlur={false}
              style={{ width: '67%' }}/>
          </Form.Group>
        </Grid.Column>
        <Grid.Column className='pt0 mt8' computer={6}>
          <span ><b>Enter the daily charges for medication adminstration:</b></span>
        </Grid.Column>
        <Grid.Column className='pt0' computer={5}>
          <Form.Group>
            <Form.Field
              className='charges-input'
              control={Input}
              name='med_charges'
              type='number'/>
          </Form.Group>

        </Grid.Column>

      </Grid>

      <Grid>
        <Grid.Column
          className='adjust-m-heading'
          computer={16} mobile={16} tablet={16}>
          <span className='quick-link-font' color='teal'><b>Adjust Editable Field Values</b></span>
        </Grid.Column>
        <span>Edit field values regarding all things Medication related here.</span>
      </Grid>
      <Grid>
        <Grid.Column
          computer={12} mobile={16} tablet={16}>
          {activeMenuItem === 'medicationTimes' && <span>Use the medication schedules based on your facilities operations.
            If you charge for medication, ensure {'"Charge Applies"'} is enabled.</span>}
          {activeMenuItem === 'medications' && <span>Medications added here will populate in the medication type list.</span> }
          {activeMenuItem === 'reportStatus' && <span>This field shows up on your medication reports and run cards if enabled. You can
            enable the {'"Charge Applies"'} based on status.</span> }
          {activeMenuItem === 'units' && <span>List the units for medications:</span> }
          {activeMenuItem === 'measurements' && <span>List the measurements for medications:</span> }
        </Grid.Column>
      </Grid>
      <Grid className='mh0 menu-item-padding' columns={2}>
        <Grid.Column
          className='grid-step pl0'
          computer={3} mobile={16} tablet={4}>
          <Step.Group fluid vertical>
            <Step
              active={activeMenuItem === 'medicationTimes'} link name='medicationTimes'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Medication Times</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'medicationType'} link name='medicationType'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Medication Type</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'medications'} link name='medications'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Medications</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'reportStatus'} link name='reportStatus'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Report Status</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'units'} link name='units'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Units</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'measurements'} link name='measurements'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title> Measurements</Step.Title>
              </Step.Content>
            </Step>

          </Step.Group>

        </Grid.Column>
        <Grid.Column
          className='table-margin ml8'
          computer={13} mobile={16} tablet={13}>
          {activeMenuItem === 'medicationTimes' && <MedicationTime/>}
          {activeMenuItem === 'medications' && <Medication/> }
          {activeMenuItem === 'reportStatus' && <MedicationReportStatus/> }
          {activeMenuItem === 'units' && <MedicationUnit/> }
          {activeMenuItem === 'measurements' && <MedicationMeasurement/> }
          {activeMenuItem === 'medicationType' && <MedicationType/>}
        </Grid.Column>
      </Grid>
    </>

  )
}

export default  compose(
  connect(
    null

  ),
  reduxForm({
    form              : 'editable-field',
    destroyOnUnmount  : false,
    enableReinitialize: true

  })
)(EditableField)

