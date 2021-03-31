import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import PetKennelAreaForm from  './create'
import { useChangeStatusEffect } from '@hooks/Shared'
import petKennelAreaListConfig from '@lib/constants/list-configs/pet/pet-kennel-area'

import petKennelAreaDuck from '@reducers/pet/pet-kennel-area'
import petKennelAreaDetailDuck from '@reducers/pet/pet-kennel-area/detail'

const PetKennelAreaList = ({ petKennelArea, petKennelAreaDetail, ...props }) => {
  useChangeStatusEffect(props.getPetKennelAreas, petKennelAreaDetail.status)

  useEffect(() => {
    props.getPetKennelAreas()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(petKennelArea.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={12} tablet={8}>
            <Header as='h2'>Kennel Areas</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              color='teal' content='New Kennel Area'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={petKennelAreaListConfig}
          duck={petKennelAreaDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <ModalDelete duckDetail={petKennelAreaDetailDuck}/>
      <PetKennelAreaForm/>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petKennelArea      : petKennelAreaDuck.selectors.list(state),
      petKennelAreaDetail: petKennelAreaDetailDuck.selectors.detail(state)
    }), {
      getPetKennelAreas: petKennelAreaDuck.creators.get,
      setItem          : petKennelAreaDetailDuck.creators.setItem
    })
)(PetKennelAreaList)
