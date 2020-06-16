import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetClassForm from  './create'

import petClassDuck from '@reducers/pet/class'
import petClassDetailDuck from '@reducers/pet/class/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

const PetClassList = ({ ...props }) => {
  const { petClassDetail : { status } = {} } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getPetClasses()
  }, [])

  useChangeStatusEffect(props.getPetClasses, status)

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
            <Header as='h2' className='cls-MainHeader'>Pets Classes</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button className='cls-cancelButton' content='Download' disabled/>
            <Button
              className='cls-cancelButton'
              content='Filter'
              disabled
              icon='filter'
              labelPosition='left'/>
            <Button
              as={Link}
              className='cls-saveButton' color='teal' content='New Pet Class'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petClassDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
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
      petClassDetail: petClassDetailDuck.selectors.detail(state)
    }), {
      getPetClasses: petClassDuck.creators.get,
      setItem      : petClassDetailDuck.creators.setItem
    })
)(PetClassList)
