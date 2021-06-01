import React, { useState } from 'react'
import { Grid, Header, Segment,  Step } from 'semantic-ui-react'
import TrainingReasonTable from './training-reason'
import TrainingMethodTable from './training-method'
import TrainingCommandTable from  './training-command'
import TrainingRatingKey from './rating-key'
import  '../styles.scss'

const EditableFieldTab = ()=>{
  const [ activeTab, setActiveTab ] = useState('reason')

  return (

    <Segment className='segment-content-no-border'>
      <Header as='h4' className='mb20' color='teal'>Adjust Editable Field Values</Header>
      <Grid>
        <Grid.Column computer={16}>
          <Grid>
            <Grid.Column  className='grid-step pr0 mr32' computer={3}>
              <Step.Group fluid vertical>
                <Step
                  active={activeTab === 'reason'}
                  link name='reason'
                  onClick={()=>{setActiveTab('reason')}}>
                  <Step.Content>
                    <Step.Title>  Reasons For Training</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={activeTab === 'method'}
                  link name='method'
                  onClick={()=>{setActiveTab('method')}}>
                  <Step.Content>
                    <Step.Title> Training Methods</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={activeTab === 'command'}
                  link name='command'
                  onClick={()=>{setActiveTab('command')}}>
                  <Step.Content>
                    <Step.Title> Commands</Step.Title>
                  </Step.Content>
                </Step>
                <Step
                  active={activeTab === 'ratingkey'}
                  link name='ratingkey'
                  onClick={()=>{setActiveTab('ratingkey')}}>
                  <Step.Content>
                    <Step.Title> Rating Key </Step.Title>
                  </Step.Content>
                </Step>

              </Step.Group>
            </Grid.Column>
            <Grid.Column computer={12}>
              {activeTab === 'reason' &&  <TrainingReasonTable/> }
              {activeTab === 'method' && <TrainingMethodTable/>}
              {activeTab === 'command' && <TrainingCommandTable/>}
              {activeTab === 'ratingkey' && <TrainingRatingKey/>}
            </Grid.Column>

          </Grid>
        </Grid.Column>

      </Grid>

    </Segment>
  )
}

export default EditableFieldTab
