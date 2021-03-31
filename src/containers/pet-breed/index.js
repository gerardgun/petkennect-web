import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import PetBreedForm from  './create'
import { useChangeStatusEffect } from '@hooks/Shared'
import petBreedListConfig from '@lib/constants/list-configs/pet/breed'

import petBreedDuck from '@reducers/pet/breed'
import petBreedDetailDuck from '@reducers/pet/breed/detail'

const PetBreedList = ({ petBreed, petBreedDetail, ...props }) => {
  useChangeStatusEffect(props.getPetBreeds, petBreedDetail.status)

  useEffect(() => {
    props.getPetBreeds()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(petBreed.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={12} tablet={8}>
            <Header as='h2'>Pet Breeds</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              color='teal' content='New Pet Breed'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={petBreedListConfig}
          duck={petBreedDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <PetBreedForm/>
      <ModalDelete duckDetail={petBreedDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petBreed      : petBreedDuck.selectors.list(state),
      petBreedDetail: petBreedDetailDuck.selectors.detail(state)
    }), {
      getPetBreeds: petBreedDuck.creators.get,
      setItem     : petBreedDetailDuck.creators.setItem
    })
)(PetBreedList)
