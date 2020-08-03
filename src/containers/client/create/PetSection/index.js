import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import Form from './Form'

import clientPetDuck from '@reducers/client/pet'
import petDetailDuck from '@reducers/pet/detail'
import { useChangeStatusEffect } from '@hooks/Shared'
import { useParams } from 'react-router-dom'

const PetSection = (props) => {
  const { getClientPets, petDetail } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const { client: clientId } = useParams()

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

  useChangeStatusEffect(() => getClientPets({
    client_id: clientId
  }), petDetail.status)

  return (
    <Grid className='form-primary'>
      <Grid.Column>
        <Segment className='segment-content' padded='very'>
          <Grid className='segment-content-header' columns={2}>
            <Grid.Column>
              <Header as='h2'>Pet List</Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button
                content='Filter' disabled icon='filter'
                labelPosition='left'/>
              <Button
                color='teal' content='Add Pet'
                onClick={_handleAddBtnClick}/>
            </Grid.Column>
          </Grid>
          <Table
            duck={clientPetDuck}
            onRowClick={_handleRowClick}
            onRowOptionClick={_handleRowOptionClick}/>
        </Segment>

        <Form/>
        <ModalDelete
          duckDetail={petDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  connect(
    state => ({
      clientPet: clientPetDuck.selectors.list(state),
      petDetail: petDetailDuck.selectors.detail(state)
    }),
    {
      setItem      : petDetailDuck.creators.setItem,
      getClientPets: clientPetDuck.creators.get
    }
  )
)(PetSection)
