import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import PetKindForm from  './create'
import { useChangeStatusEffect } from '@hooks/Shared'

import petKindDuck from '@reducers/pet/kind'
import petKindDetailDuck from '@reducers/pet/kind/detail'

const PetKindList = ({ petKind, petKindDetail, ...props }) => {
  useChangeStatusEffect(props.getPetKinds, petKindDetail.status)

  useEffect(() => {
    props.getPetKinds()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(petKind.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={12} tablet={8}>
            <Header as='h2'>Pet Species</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button color='teal' content='New Pet Species' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petKindDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <PetKindForm/>
      <ModalDelete duckDetail={petKindDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petKind      : petKindDuck.selectors.list(state),
      petKindDetail: petKindDetailDuck.selectors.detail(state)
    }), {
      getPetKinds: petKindDuck.creators.get,
      setItem    : petKindDetailDuck.creators.setItem
    })
)(PetKindList)
