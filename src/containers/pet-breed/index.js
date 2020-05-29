import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetBreedForm from  './create'

import petBreedDuck from '@reducers/pet/breed'
import petBreedDetailDuck from '@reducers/pet/breed/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

const PetBreedList = ({ ...props }) => {
  const { petBreedDetail : { status } = {} } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getPetBreeds()
  }, [])

  useChangeStatusEffect(props.getPetBreeds, status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option , item) => {
    if(option === 'edit') {props.setItem(item, 'UPDATE')}
    else if(option === 'delete') {
      props.setItem(item)
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Pets Breed</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button content='Download' disabled/>
            <Button
              content='Filter'
              disabled
              icon='filter'
              labelPosition='left'/>
            <Button
              as={Link} color='teal' content='New Pet Breed'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petBreedDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </Segment>
      <PetBreedForm/>
      <ModalDelete
        duckDetail={petBreedDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petBreedDetail: petBreedDetailDuck.selectors.detail(state)
    }), {
      getPetBreeds: petBreedDuck.creators.get,
      setItem     : petBreedDetailDuck.creators.setItem
    })
)(PetBreedList)
