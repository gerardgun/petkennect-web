import React, { useEffect } from 'react'
import { connect , useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid,Header,Dimmer,Loader, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Form from './create'
import LocationItem from './Item'
import Menu from '@containers/company-profile/components/Menu'
import Theme from '@components/mainTheme'

import tenantDetailDuck from '@reducers/tenant/detail'
import serviceGroupDuck from '@reducers/service/group'
import locationDuck from '@reducers/location'
import locationDetailDuck from '@reducers/location/detail'

const SetupCompanyProfileLocations = ({ location, locationDetail, ...props }) => {
  const dispatch = useDispatch()
  const tenant = useSelector(tenantDetailDuck.selectors.detail)

  useEffect(() => {
    dispatch(locationDuck.creators.get())
    dispatch(serviceGroupDuck.creators.get())
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
    props.setItem(item, 'DELETE')
  }

  const loading = location.status === 'GETTING'

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2' color={Theme(tenant).headingColor} >Locations</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={10} tablet={8}>
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
      <ModalDelete duckDetail={locationDetailDuck}/>

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
)(SetupCompanyProfileLocations)
