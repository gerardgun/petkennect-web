import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid,Header,Dimmer,Loader, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Form from './create'
import LocationItem from './Item'
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

  const _handleEditBtnClick = (item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleDeleteBtnClick = (item) => {
    props.setItem(item)
    _handleOpen()
  }

  const loading = location.status === 'GETTING'

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
        <Dimmer.Dimmable as={Segment} className='border-none shadow-0' dimmed={loading}>
          <Dimmer active={loading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>

          {
            location.items && location.items.map((item)=> (
              <LocationItem
                item={item} key={item.id}
                onDelete={_handleDeleteBtnClick} onUpdate={_handleEditBtnClick}/>
            ))
          }
        </Dimmer.Dimmable>
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
