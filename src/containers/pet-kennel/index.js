import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetKennelForm from  './create'
import { useChangeStatusEffect } from '@hooks/Shared'

import petKennelDuck from '@reducers/pet/pet-kennel'
import petKennelDetailDuck from '@reducers/pet/pet-kennel/detail'

const PetKennelList = ({ petKennel, petKennelDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetKennels, petKennelDetail.status)

  useEffect(() => {
    props.getPetKennels()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(petKennel.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={12} tablet={8}>
            <Header as='h2'>Kennels</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button
              color='teal' content='New Kennel'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petKennelDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <ModalDelete
        duckDetail={petKennelDetailDuck}
        onClose={_handleClose}
        open={open}/>
      <PetKennelForm/>
    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petKennel      : petKennelDuck.selectors.list(state),
      petKennelDetail: petKennelDetailDuck.selectors.detail(state)
    }), {
      getPetKennels: petKennelDuck.creators.get,
      setItem      : petKennelDetailDuck.creators.setItem
    })
)(PetKennelList)
