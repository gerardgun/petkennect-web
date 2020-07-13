import React, { useEffect, useMemo } from 'react'
import './styles.scss'
import { connect } from 'react-redux'
import { Header, Button , Divider } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import IncidentForm from './Form'
import SendReportForm from './SendReportForm'
import ModalDelete from '@components/Modal/Delete'

import petIncidentDuck from '@reducers/pet/incident'
import petIncidentDetailDuck from '@reducers/pet/incident/detail'
import petIncidentActionsDuck from '@reducers/pet/incident-action'
import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petDetailDuck from '@reducers/pet/detail'
import { useChangeStatusEffect } from '@hooks/Shared'
import Summary from './Summary'
import { useParams } from 'react-router-dom'
import useModal from '@components/Modal/useModal'
import { openIncidentPDF } from '@lib/utils/functions'

function IncidentSection(props) {
  const { petDetail } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  const [ openSendReportModal, { _handleOpen :  _handleOpenSendReportModal, _handleClose : _handleCloseSendReportModal } ] = useModal()

  const { id } = useParams()
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
    props.getPet(id)
  }, props.petIncidentDetail.status, [ 'SENT_EMAIL' ])

  return (
    <div className='c-incident-section'>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Incident
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mv32' >
        <Summary warningIncidentTypes={_warningIncidentTypes}/>
      </div>
      <div className='flex justify-end mh40 mv32'>
        <Button
          color='teal' content='New Incident'
          onClick={_handleAddBtnClick}/>
      </div>
      <div className='mh40'>
        <Table
          duck={petIncidentDuck} onOptionClick={_handleOptionClick}/>
      </div>
      <IncidentForm/>
      <SendReportForm onClose={_handleCloseSendReportModal} open={openSendReportModal}/>
      <ModalDelete
        duckDetail={petDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </div>
  )
}

IncidentSection.propTypes = {  }

IncidentSection.defaultProps = {  }

export default compose(
  connect(
    (state) => ({
      petIncident      : petIncidentDuck.selectors.list(state),
      petIncidentDetail: petIncidentDetailDuck.selectors.detail(state),
      petIncidentAction: petIncidentActionsDuck.selectors.list(state),
      petIncidentType  : petIncidentTypeDuck.selectors.list(state),
      petDetail        : petDetailDuck.selectors.detail(state)
    }), {
      getPetIncidents      : petIncidentDuck.creators.get,
      getPet               : petDetailDuck.creators.get,
      getPetIncidentActions: petIncidentActionsDuck.creators.get,
      getPetIncidentTypes  : petIncidentTypeDuck.creators.get,
      setItem              : petIncidentDetailDuck.creators.setItem,
      removeSelectedIds    : petIncidentDuck.creators.removeSelectedIds
    })
)(IncidentSection)

