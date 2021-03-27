import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import { useChangeStatusEffect } from '@hooks/Shared'

import serviceDuck from '@reducers/service'
import serviceDetailDuck from '@reducers/service/detail'

const ServiceList = ({ service, serviceDetail ,...props }) => {
  useChangeStatusEffect(props.getServices, serviceDetail.status)

  useEffect(() => {
    props.getServices()
  }, [])

  const _handleRowClick = (e, item) => {
    props.history.push(`service/${item.id}`)
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(service.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Services</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={10} tablet={12}>
            <Button
              as={Link} color='teal'
              content='New Service'
              to='/service/create'/>
          </Grid.Column>
        </Grid>
        <Table duck={serviceDuck} onOptionClick={_handleOptionClick} onRowClick={_handleRowClick}/>
      </Segment>

      <ModalDelete duckDetail={serviceDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ service ,...state }) => ({
      service,
      serviceDetail: serviceDetailDuck.selectors.detail(state)

    }), {
      getServices: serviceDuck.creators.get,
      setItem    : serviceDetailDuck.creators.setItem
    })
)(ServiceList)
