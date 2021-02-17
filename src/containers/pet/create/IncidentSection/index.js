import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Header, Button, Container, Grid } from 'semantic-ui-react'
import { compose } from 'redux'

import loadable from '@loadable/component'

import useModal from '@components/Modal/useModal'

import { useChangeStatusEffect } from '@hooks/Shared'
import { openIncidentPDF } from '@lib/utils/functions'

import petIncidentDuck from '@reducers/pet/incident'
import petIncidentDetailDuck from '@reducers/pet/incident/detail'
import petIncidentActionDuck from '@reducers/pet/incident-action'
import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petDetailDuck from '@reducers/pet/detail'

import './styles.scss'

const Table = loadable(() => import('@components/Table'))
const IncidentForm = loadable(() => import('./Form'))
const SendReportForm = loadable(() => import('./SendReportForm'))
const ModalDelete = loadable(() => import('@components/Modal/Delete'))
const Summary = loadable(() => import('./Summary'))

function IncidentSection(props) {
  const { petDetail } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  const [ openSendReportModal, { _handleOpen :  _handleOpenSendReportModal, _handleClose : _handleCloseSendReportModal } ] = useModal()

  const { pet: petId } = useParams()

  useEffect(()=> {
    props.getPetIncidents()
    props.getPetIncidentTypes()
    props.getPetIncidentActions()

    return ()=> {
      props.removeSelectedIds()
    }
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    const item = props.petIncident.selector.selected_items[0]
    if(option === 'view_pdf')
      openIncidentPDF(petDetail.item.id,item.id, `pet-incident-${item.id}-${item.action}-${item.type}`)
    if(option === 'edit')
      props.setItem(props.petIncident.selector.selected_items[0], 'UPDATE')
    if(option === 'preview_report')
      _handleOpenSendReportModal()

    if(option === 'delete') {
      props.setItem(props.petIncident.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  const _warningIncidentTypes = useMemo(()=> {
    return  props.petDetail.item.summary.incident_types
      .filter(_incidentType=>  _incidentType.limit && _incidentType.limit - _incidentType.count <= 1)
      .map(_incidentType => ({
        ..._incidentType,
        name: (props.petIncidentType.items.find(_type => _type.id === _incidentType.id) || {}).name
      }))
  }, [ props.petDetail.item.summary.incident_types, props.petIncidentType.items ])

  useChangeStatusEffect(()=> {
    props.getPetIncidents()
    props.getPet(petId)
  }, props.petIncidentDetail.status, [ 'SENT' ])

  return (
    <Container className='c-incident-section' fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Incident</Header>
        </Grid.Column>
        <Grid.Column
          className='ui-grid-align'
          computer={8} mobile={12} tablet={8}>
          <Button
            color='teal' content='New Incident'
            onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <div className='mh28 mv32' >
        <Summary warningIncidentTypes={_warningIncidentTypes}/>
      </div>
      <div className='mh28'>
        <Table
          duck={petIncidentDuck} onOptionClick={_handleOptionClick}/>
      </div>
      <IncidentForm/>
      <SendReportForm onClose={_handleCloseSendReportModal} open={openSendReportModal}/>
      <ModalDelete
        duckDetail={petIncidentDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </Container>
  )
}

IncidentSection.propTypes = {  }

IncidentSection.defaultProps = {  }

export default compose(
  connect(
    (state) => ({
      petIncident      : petIncidentDuck.selectors.list(state),
      petIncidentDetail: petIncidentDetailDuck.selectors.detail(state),
      petIncidentAction: petIncidentActionDuck.selectors.list(state),
      petIncidentType  : petIncidentTypeDuck.selectors.list(state),
      petDetail        : petDetailDuck.selectors.detail(state)
    }), {
      getPetIncidents      : petIncidentDuck.creators.get,
      getPet               : petDetailDuck.creators.get,
      getPetIncidentActions: petIncidentActionDuck.creators.get,
      getPetIncidentTypes  : petIncidentTypeDuck.creators.get,
      setItem              : petIncidentDetailDuck.creators.setItem,
      removeSelectedIds    : petIncidentDuck.creators.removeSelectedIds
    })
)(IncidentSection)

