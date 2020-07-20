import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetIncidentForm from  './Form'
import EmailForm from  './EmailForm'

import petIncidentDuck from '@reducers/pet/incident'
import petIncidentDetailDuck from '@reducers/pet/incident/detail'
import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petDetailDuck from '@reducers/pet/detail'

import { useChangeStatusEffect } from '@hooks/Shared'

import { downloadIncidentPDF, openIncidentPDF } from '@lib/utils/functions'

const IncidentSectionList = ({ ...props }) => {
  const { petIncidentDetail : { status } = {}, petIncidentType , petDetail } = props
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()
  const [ openEmailFormModal, { _handleOpen: _handleOpenEmailFormModal, _handleClose: _handleCloseEmailFormModal } ] = useModal()

  useEffect(() => {
    props.getPetIncidents()
    props.getPetIncidentTypes()
  }, [])

  useChangeStatusEffect(props.getPetIncidents, status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _warningIncidentTypes = useMemo(()=> {
    return  petDetail.item.summary.incident_types
      .filter(_incidentType=>  _incidentType.limit && _incidentType.limit - _incidentType.count <= 1)
      .map(_incidentType => ({
        ..._incidentType,
        name: (petIncidentType.items.find(_type => _type.id === _incidentType.id) || {}).name
      }))
  }, [ petDetail.item.summary.incident_types, petIncidentType.items ])

  const _handleRowOptionClick = (option , item) => {
    switch (option) {
      case 'view_pdf':
        openIncidentPDF(petDetail.item.id, item.id, `pet-incident-${item.id}-${item.action}-${item.type}`)

        return

      case 'edit':
        props.setItem(item, 'UPDATE')

        return

      case 'delete':
        props.setItem(item)
        _handleOpenDeleteModal()

        return

      case 'preview_report':
        _handleOpenEmailFormModal()
        props.setItem(item)

        return

      case 'download_report':
        downloadIncidentPDF(petDetail.item.id, item.id, `pet-incident-${item.id}-${item.action}-${item.type}`)

        return

      default:
        return
    }
  }

  return (

    <Grid className='form-primary'>
      <Grid.Column>
        <Segment className='segment-content' padded='very'>
          {Boolean(_warningIncidentTypes.length) && (
            <Grid className='gray br16' padded>
              <Grid.Column width='16'>
                <Header as='h3'><Icon color='yellow'  name='warning sign' size='large'/> Warning </Header>
                Some types of incidents are going over the limits:
              </Grid.Column>
              <Grid.Column width='16'>
                {_warningIncidentTypes.map((_type, index) => (<span key={index} >
                  <strong>
                    {_type.name}{'  '}
                  </strong>
                  &#8594;
                  {'  '}Limit:{' '}
                  <strong>
                    {_type.limit}{' '}
                  </strong>
                  {' '}Current:{' '}
                  <strong>
                    {_type.count}{' '}
                  </strong>
                  <br/>
                </span>))}

              </Grid.Column>
            </Grid>
          )}
          <Grid className='segment-content-header' columns={2}>
            <Grid.Column>
              <Header as='h2'>Incident History</Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button
                as={Link} color='teal' content='New Incident'
                onClick={_handleAddBtnClick}/>
            </Grid.Column>
          </Grid>
          <Table
            duck={petIncidentDuck}
            onRowClick={_handleRowClick}
            onRowOptionClick={_handleRowOptionClick}/>
        </Segment>

        <PetIncidentForm/>
        <EmailForm onClose={_handleCloseEmailFormModal} open={openEmailFormModal}/>
        <ModalDelete
          duckDetail={petIncidentDetailDuck}
          onClose={_handleCloseDeleteModal}
          open={openDeleteModal}/>
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  connect(
    state => ({
      petIncident      : petIncidentDuck.selectors.list(state),
      petIncidentDetail: petIncidentDetailDuck.selectors.detail(state),
      petIncidentType  : petIncidentTypeDuck.selectors.list(state),
      petDetail        : petDetailDuck.selectors.detail(state)
    }), {
      getPetIncidents    : petIncidentDuck.creators.get,
      getPetIncidentTypes: petIncidentTypeDuck.creators.get,
      setItem            : petIncidentDetailDuck.creators.setItem
    })
)(IncidentSectionList)
