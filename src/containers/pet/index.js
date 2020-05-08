import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Input } from 'semantic-ui-react'

import Layout from '@components/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import petDuck from '@reducers/pet'
import petDetailDuck from '@reducers/pet/detail'
import { useChangeStatusEffect, useDebounceText } from '@hooks/Shared'

const PetList = ({ pet, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const { _handleChangeText } = useDebounceText((text)=> {
    props.setFilters({ search: text })
    props.getPets()
  })

  useEffect(() => {
    props.getPets()
  }, [])

  useChangeStatusEffect(props.getPets,pet.status)

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column width={4}>
            <Header as='h2'>Pets</Header>
          </Grid.Column >
          <Grid.Column textAlign='right' width={12}>
            <Input
              icon='search' onChange={_handleChangeText}
              placeholder='Search...'/>
            <Button className='' content='Download' disabled/>
            <Button
              content='Filter' disabled icon='filter'
              labelPosition='left'/>
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
      getPets   : petDuck.creators.get,
      setFilters: petDuck.creators.setFilters
    })
)(PetList)
