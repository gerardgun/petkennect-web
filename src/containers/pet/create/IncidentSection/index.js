import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, Button , Divider, Icon } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'

import petIncidentDuck from '@reducers/pet/incident'
import petIncidentDetailDuck from '@reducers/pet/incident/detail'
import petIncidentActionsDuck from '@reducers/pet/incident-action'
import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petDetailDuck from '@reducers/pet/detail'

function IncidentSection(props) {
  useEffect(()=> {
    props.getPetIncidents()
    props.getPetIncidentTypes()
    props.getPetIncidentActions()
  }, [])

  const _handleRowClick = () => {
  // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }

  return (
    <div>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Incident
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mv32'>
        <Button disabled>
          <Icon name='ellipsis vertical'/>
        </Button>

      </div>
      <div className='mh40'>
        <Table
          duck={petIncidentDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </div>
    </div>
  )
}

IncidentSection.propTypes = {  }

IncidentSection.defaultProps = {  }

export default compose(
  connect(
    state => ({
      petIncident      : petIncidentDuck.selectors.list(state),
      petIncidentDetail: petIncidentDetailDuck.selectors.detail(state),
      petIncidentAction: petIncidentActionsDuck.selectors.list(state),
      petIncidentType  : petIncidentTypeDuck.selectors.list(state),
      petDetail        : petDetailDuck.selectors.detail(state)
    }), {
      getPetIncidents      : petIncidentDuck.creators.get,
      getPetIncidentActions: petIncidentActionsDuck.creators.get,
      getPetIncidentTypes  : petIncidentTypeDuck.creators.get,
      setItem              : petIncidentDetailDuck.creators.setItem
    })
)(IncidentSection)

