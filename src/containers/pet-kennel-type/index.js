import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import PetKennelForm from  './create'
import { useChangeStatusEffect } from '@hooks/Shared'
import petKennelTypeListConfig from '@lib/constants/list-configs/pet/pet-kennel-type'

import petKennelTypeDuck from '@reducers/pet/pet-kennel-type'
import petKennelTypeDetailDuck from '@reducers/pet/pet-kennel-type/detail'

const PetKennelTypeList = ({ petKennelType, petKennelTypeDetail, ...props }) => {
  useChangeStatusEffect(props.getPetKennelTypes, petKennelTypeDetail.status)

  useEffect(() => {
    props.getPetKennelTypes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(petKennelType.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={12} tablet={8}>
            <Header as='h2'>Kennel Types</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              color='teal' content='New Kennel Type'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={petKennelTypeListConfig}
          duck={petKennelTypeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <ModalDelete duckDetail={petKennelTypeDetailDuck}/>
      <PetKennelForm/>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petKennelType      : petKennelTypeDuck.selectors.list(state),
      petKennelTypeDetail: petKennelTypeDetailDuck.selectors.detail(state)
    }), {
      getPetKennelTypes: petKennelTypeDuck.creators.get,
      setItem          : petKennelTypeDetailDuck.creators.setItem
    })
)(PetKennelTypeList)
