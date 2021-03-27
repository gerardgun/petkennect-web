import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import PetYardForm from  './create'
import { useChangeStatusEffect } from '@hooks/Shared'

import petYardTypeDuck from '@reducers/pet/pet-yard-type'
import petYardTypeDetailDuck from '@reducers/pet/pet-yard-type/detail'

const PetYardTypeList = ({ petYardType, petYardTypeDetail, ...props }) => {
  useChangeStatusEffect(props.getPetYardTypes, petYardTypeDetail.status)

  useEffect(() => {
    props.getPetYardTypes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(petYardType.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={12} tablet={8}>
            <Header as='h2'>Yard Types</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              color='teal' content='New Yard Type'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petYardTypeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <ModalDelete duckDetail={petYardTypeDetailDuck}/>
      <PetYardForm/>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petYardType      : petYardTypeDuck.selectors.list(state),
      petYardTypeDetail: petYardTypeDetailDuck.selectors.detail(state)
    }), {
      getPetYardTypes: petYardTypeDuck.creators.get,
      setItem        : petYardTypeDetailDuck.creators.setItem
    })
)(PetYardTypeList)
