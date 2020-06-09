import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import ModalFilter from '@components/Modal/Filter'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetIncidentForm from  './Form'

import petIncidentDuck from '@reducers/pet/incident'
import petIncidentDetailDuck from '@reducers/pet/incident/detail'
import petIncidentActionsDuck from '@reducers/pet/incident-action'
import petIncidentTypeDuck from '@reducers/pet/incident-type'

import { useChangeStatusEffect } from '@hooks/Shared'

import _groupBy  from 'lodash/groupBy'

const IncidentSectionList = ({ ...props }) => {
  const { petIncidentDetail : { status } = {}, petIncident, petIncidentAction, petIncidentType } = props
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()
  const [ openFilterModal, { _handleOpen: _handleOpenFilterModal, _handleClose: _handleCloseFilterModal } ] = useModal()

  useEffect(() => {
    props.getPetIncidents()
    props.getPetIncidentTypes()
    props.getPetIncidentActions()
  }, [])

  useChangeStatusEffect(props.getPetIncidents, status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _warningIncidentTypes = useMemo(()=> {
    try {
      // temp trycatch currently backend lack some field
      const _incidentTypesWithLimit = petIncidentType.items.filter(_type => _type.limit)
      const _incidentTypeWithLimitIds = petIncidentType.items.filter(_type => _type.limit).map(_type=> _type.id)

      const _warningPetIncidents =  petIncident.items.filter(_petIncident => _incidentTypeWithLimitIds.includes(_petIncident.type))

      const _warningPetIncidentsByType = _groupBy(_warningPetIncidents , 'type')

      return  _incidentTypesWithLimit
        .filter(_type => Boolean(_warningPetIncidentsByType[_type]) && _type.limit - _warningPetIncidentsByType[_type].length <= 2)
        .map(_type=> ({
          name   : _type.name,
          limit  : _type.limit,
          current: _warningPetIncidentsByType[_type].length
        }))
    } catch (error) {
      return  []
    }
  }, [ petIncident.items, petIncidentType.items ])

  const _handleRowOptionClick = (option , item) => {
    switch (option) {
      case 'view_pdf':
        alert('working in progress...')

        return

      case 'edit':
        props.setItem(item, 'UPDATE')

        return

      case 'delete':
        props.setItem(item)
        _handleOpenDeleteModal()

        return

      case 'preview_report':
        alert('working in progress...')

        return

      case 'download_report':
        alert('working in progress...')

        return

      default:
        return
    }
  }

  return (
    <>
      <Segment className='segment-content' padded='very'>
        {Boolean(_warningIncidentTypes.length) && (
          <Grid>
            <Header as='h3'><Icon color='yellow'  name='warning sign' size='large'/> Warning </Header>
              Some types of incidents are going over the limits:
            {_warningIncidentTypes.map((_type, index) => (<div key={index}>
              <Header size='tiny'>
                {_type.name}{'  '}
              </Header>
              <Icon name='long arrow alternate right'/>
              {'  '}Limit:{' '}
              <Header size='tiny'>
                {_type.limit}{' '}
              </Header>
              {' '}Current:{' '}
              <Header size='tiny'>
                {_type.current}{' '}
              </Header>
            </div>))}
          </Grid>
        )}
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Incident History</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              content='Filter' icon='filter'
              labelPosition='left'
              onClick={_handleOpenFilterModal}/>
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

      <ModalFilter
        duck={petIncidentDuck}
        onClose={_handleCloseFilterModal}
        open={openFilterModal}
        options={{
          action_name: petIncidentAction.items,
          type_name  : petIncidentType.items
        }}/>
      <ModalDelete
        duckDetail={petIncidentDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      petIncident      : petIncidentDuck.selectors.list(state),
      petIncidentDetail: petIncidentDetailDuck.selectors.detail(state),
      petIncidentAction: petIncidentActionsDuck.selectors.list(state),
      petIncidentType  : petIncidentTypeDuck.selectors.list(state)
    }), {
      getPetIncidents      : petIncidentDuck.creators.get,
      getPetIncidentActions: petIncidentActionsDuck.creators.get,
      getPetIncidentTypes  : petIncidentTypeDuck.creators.get,
      setItem              : petIncidentDetailDuck.creators.setItem
    })
)(IncidentSectionList)
