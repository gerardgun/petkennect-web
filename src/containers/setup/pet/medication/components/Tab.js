import React, { useState } from 'react'
import { Segment, Grid, Step } from 'semantic-ui-react'
import SetupPetMedicationMeasurementIndex from '../measurement-section'
import SetupPetMedicationReportStatusIndex from '../report-status-section'
import SetupPetMedicationTimeIndex from '../time-section'
import SetupPetMedicationTypeIndex from '../type-section'
import SetupPetMedicationUnitIndex from '../unit-section'
import SetupPetMedicationSectionIndex from '../medication-section'

const Tab = () => {

  const [ activeTab, setActiveTab ] = useState('Medications')

  return (
    <Segment className='segment-content-no-border'>
      <p>
        <b>Edit field values regarding all things medication related here.</b>
      </p>
      <Grid>
        <Grid.Column computer={16}>
          <Grid>
            <Grid.Column  className='grid-step pr0 mr32' computer={3}>
              <Step.Group fluid vertical>
                <Step
                  active={activeTab === 'Medication Times'}
                  link name='Medication Times'
                  onClick={()=>{setActiveTab('Medication Times')}}>
                  <Step.Content>
                    <Step.Title>Medication Times</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={activeTab === 'Medication Types'}
                  link name='Medication Types'
                  onClick={()=>{setActiveTab('Medication Types')}}>
                  <Step.Content>
                    <Step.Title>Medication Types</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={activeTab === 'Medications'}
                  link name='Medications'
                  onClick={()=>{setActiveTab('Medications')}}>
                  <Step.Content>
                    <Step.Title>Medications</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={activeTab === 'Report Status'}
                  link name='Report Status'
                  onClick={()=>{setActiveTab('Report Status')}}>
                  <Step.Content>
                    <Step.Title>Report Status</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={activeTab === 'Units'}
                  link name='Units'
                  onClick={()=>{setActiveTab('Units')}}>
                  <Step.Content>
                    <Step.Title>Units</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={activeTab === 'Measurements'}
                  link name='Measurements'
                  onClick={()=>{setActiveTab('Measurements')}}>
                  <Step.Content>
                    <Step.Title>Measurements</Step.Title>
                  </Step.Content>
                </Step>
              </Step.Group>
            </Grid.Column>
            <Grid.Column computer={12}>
              {activeTab === 'Medication Times' &&  <SetupPetMedicationTimeIndex/> }
              {activeTab === 'Medication Types' && <SetupPetMedicationTypeIndex/>}
              {activeTab === 'Medications'      && <SetupPetMedicationSectionIndex/>}
              {activeTab === 'Report Status'    && <SetupPetMedicationReportStatusIndex/>}
              {activeTab === 'Units'            && <SetupPetMedicationUnitIndex/>}
              {activeTab === 'Measurements'     && <SetupPetMedicationMeasurementIndex/>}
            </Grid.Column>

          </Grid>
        </Grid.Column>

      </Grid>

    </Segment>
  )
}

export default Tab
