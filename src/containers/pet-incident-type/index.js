import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import PetIncidentTypeForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petIncidentTypeListConfig from '@lib/constants/list-configs/pet/incident-type'

import petIncidentTypeDuck from '@reducers/pet/incident-type'
import petIncidentTypeDetailDuck from '@reducers/pet/incident-type/detail'

const PetIncidentTypeList = ({ petIncidentType, petIncidentTypeDetail, ...props }) => {
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
    if(option === 'delete')
      props.setItem(petIncidentType.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2'>Incident Types</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={13} tablet={8}>
            <Button
              color='teal' content='New Incident Type'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={petIncidentTypeListConfig}
          duck={petIncidentTypeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <PetIncidentTypeForm/>
      <ModalDelete duckDetail={petIncidentTypeDetailDuck}/>

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
