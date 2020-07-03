import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import Form from './create'
import useModal from '@components/Modal/useModal'

import locationDuck from '@reducers/location'
import locationDetailDuck from '@reducers/location/detail'

const Location = ({ location, locationDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getLocations()
  }, [])

  useEffect(() => {
    if(locationDetail.status === 'POSTED' || locationDetail.status === 'PUT' || locationDetail.status === 'DELETED')
      props.getLocations()
  }, [ locationDetail.status ])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(location.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Locations</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button color='teal' content='New Location' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={locationDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>

      <Form/>
      <ModalDelete
        duckDetail={locationDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ location, ...state }) => ({
      location,
      locationDetail: locationDetailDuck.selectors.detail(state)
    }),
    {
      getLocations: locationDuck.creators.get,
      setItem     : locationDetailDuck.creators.setItem
    }
  )
)(Location)
