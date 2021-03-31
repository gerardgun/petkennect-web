import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetIncidentTypeForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'

import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petIncidentTypeDetailDuck from '@reducers/pet/incident-type/detail'

const PetIncidentTypeList = ({ petIncidentType, petIncidentTypeDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetIncidentTypes, petIncidentTypeDetail.status)

  useEffect(() => {
    props.getPetIncidentTypes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(petIncidentType.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column
          computer={10} mobile={12} tablet={8}>
          <Table
            duck={petIncidentTypeDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={6} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Incident Type</Button>
        </Grid.Column>
      </Grid>

      <PetIncidentTypeForm/>
      <ModalDelete
        duckDetail={petIncidentTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      petIncidentType      : petIncidentTypeDuck.selectors.list(state),
      petIncidentTypeDetail: petIncidentTypeDetailDuck.selectors.detail(state)
    }), {
      getPetIncidentTypes: petIncidentTypeDuck.creators.get,
      setItem            : petIncidentTypeDetailDuck.creators.setItem
    })
)(PetIncidentTypeList)
