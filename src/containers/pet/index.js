import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Input } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import Form from '@containers/client/create/PetSection/Form'

import petDuck from '@reducers/pet'
import petDetailDuck from '@reducers/pet/detail'
import { useChangeStatusEffect, useDebounceText } from '@hooks/Shared'

const PetList = ({ pet, petDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getPets()
  }, [])

  const { _handleChangeText } = useDebounceText((text)=> {
    props.setFilters({ search: text })
    props.getPets()
  })

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

  useChangeStatusEffect(props.getPets,petDetail.status)

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
          </Grid.Column>
        </Grid>
        <Table
          duck={petDuck}  onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </Segment>
      <Form/>
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
    ({ pet ,...state }) => ({
      pet,
      petDetail: petDetailDuck.selectors.detail(state)
    }), {
      getPets   : petDuck.creators.get,
      setFilters: petDuck.creators.setFilters,
      setItem   : petDetailDuck.creators.setItem
    })
)(PetList)
