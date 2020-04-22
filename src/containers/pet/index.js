import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import petDuck from '@reducers/pet'
import petDetailDuck from '@reducers/pet/detail'

const PetList = ({ pet, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getPets()
  }, [])

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Pets</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button content='Download'/>
            <Button content='Filter' icon='filter' labelPosition='left'/>
            {
              pet.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' onClick={_handleOpen}/>)
            }
            <Button
              as={Link} color='teal' content='New Pet'
              to='/pet/create'/>
          </Grid.Column>
        </Grid>
        <Table duck={petDuck}/>
      </Segment>

      <ModalDelete
        duck={petDuck}
        duckDetail={petDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ pet }) => ({
      pet
    }), {
      getPets: petDuck.creators.get
    })
)(PetList)
