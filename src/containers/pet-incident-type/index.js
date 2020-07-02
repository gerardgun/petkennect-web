import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
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
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Incident Types</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              color='teal' content='New Incident Type'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petIncidentTypeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <PetIncidentTypeForm/>
      <ModalDelete
        duckDetail={petIncidentTypeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
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
