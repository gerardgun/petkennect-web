import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import PetClassForm from  './create'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from '@hooks/Shared'

import petClassDuck from '@reducers/pet/class'
import petClassDetailDuck from '@reducers/pet/class/detail'

const PetClassList = ({ petClass, petClassDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetClasses, petClassDetail.status)

  useEffect(() => {
    props.getPetClasses()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(petClass.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Pet Classes</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button color='teal' content='New Pet Class' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petClassDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <PetClassForm/>
      <ModalDelete
        duckDetail={petClassDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petClass      : petClassDuck.selectors.list(state),
      petClassDetail: petClassDetailDuck.selectors.detail(state)
    }), {
      getPetClasses: petClassDuck.creators.get,
      setItem      : petClassDetailDuck.creators.setItem
    })
)(PetClassList)
