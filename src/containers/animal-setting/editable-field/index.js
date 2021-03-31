import React, { useState } from 'react'
import { Grid, span, Step } from 'semantic-ui-react'
import loadable from '@loadable/component'

import '../styles.scss'

const RetireReason = loadable(() => import('./../pet-retire-reason'))
const IncidentAction = loadable(() => import('./../pet-incident-action'))
const IncidentBehavior = loadable(() => import('./../pet-incident-behavior'))
const IncidentType = loadable(() => import('./../pet-incident-type'))
const InteractionType = loadable(() => import('./../pet-interaction-type'))
const VeterinarianList = loadable(() => import('./../veterinarian-list'))

const EditableField = ()=>{
  const [ activeMenuItem, setActiveMenuItem ] = useState('retireReason')
  const _handleMenuItemClick = (e, { name }) => setActiveMenuItem(name)

  return (
    <>
      <Grid>
        <Grid.Column
          className='ml16'
          computer={16} mobile={16} tablet={16}>
          <span className='quick-link-font' color='teal'><b>Adjust Editable Field Values</b></span>
        </Grid.Column>
      </Grid>
      <Grid className='mh0 menu-item-padding' columns={2}>
        <Grid.Column
          className='mt55 grid-step'
          computer={3} mobile={16} tablet={4}>
          <Step.Group fluid vertical>
            <Step
              active={activeMenuItem === 'retireReason'} link name='retireReason'
              onClick={_handleMenuItemClick} >
              <Step.Content>
                <Step.Title>Retire Reason</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'interactionType'} link name='interactionType'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title>Interaction Types</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'incidentBehavior'} link name='incidentBehavior'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title>Incident Behaviors</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'incidentType'} link name='incidentType'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title>Incident Types</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'incidentAction'} link name='incidentAction'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title>Incident Actions</Step.Title>
              </Step.Content>
            </Step>
            <Step
              active={activeMenuItem === 'veterinarianList'} link name='veterinarianList'
              onClick={_handleMenuItemClick}>
              <Step.Content>
                <Step.Title>Veterinarian List</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Column>
        <Grid.Column
          className='table-margin ml8'
          computer={13} mobile={16} tablet={13}>
          {activeMenuItem === 'retireReason' && <RetireReason/>}
          {activeMenuItem === 'interactionType' && <InteractionType/> }
          {activeMenuItem === 'incidentBehavior' && <IncidentBehavior/> }
          {activeMenuItem === 'incidentType' && <IncidentType/> }
          {activeMenuItem === 'incidentAction' && <IncidentAction/> }
          {activeMenuItem === 'veterinarianList' && <VeterinarianList/> }
        </Grid.Column>
      </Grid>
    </>

  )
}

export default EditableField
