import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetFormModal from './form/modal'
import { useChangeStatusEffect } from '@hooks/Shared'

import petDuck from '@reducers/pet'
import petDetailDuck from '@reducers/pet/detail'
import petBreedDuck from '@reducers/pet/breed'

import './styles.scss'

const PetList = ({ pet, petDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPets,petDetail.status)

  useEffect(() => {
    props.getPets({ retired: false })
    props.getPetBreeds()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(pet.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content pet' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column width={4}>
            <Header as='h2'>Pets</Header>
          </Grid.Column >
          <Grid.Column textAlign='right' width={12}>
            <Button color='teal' content='New Pet' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table duck={petDuck} onOptionClick={_handleOptionClick}/>
      </Segment>

      <PetFormModal/>
      <ModalDelete
        duckDetail={petDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ pet, ...state }) => ({
      pet,
      petDetail: petDetailDuck.selectors.detail(state)
    }), {
      getPets     : petDuck.creators.get,
      getPetBreeds: petBreedDuck.creators.get,
      setItem     : petDetailDuck.creators.setItem
    })
)(PetList)
