import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment, Input } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'

import serviceDuck from '@reducers/service'
import serviceDetailDuck from '@reducers/service/detail'
import { useChangeStatusEffect, useDebounceText } from '@hooks/Shared'

const ServiceList = ({ serviceDetail ,...props }) => {
  const { status } = serviceDetail

  const { _handleChangeText } = useDebounceText((text)=> {
    props.setFilters({ search: text })
    props.getServices()
  })

  useEffect(() => {
    props.getServices()
  }, [])

  useChangeStatusEffect(props.getServices,status)

  const _handleRowClick = (e, item) => {
    props.history.push(`service/${item.id}`)
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit')
      props.history.push(`service/${item.id}`)
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column width={4}>
            <Header as='h2'>Services</Header>
          </Grid.Column >
          <Grid.Column textAlign='right' width={12}>
            <Input
              icon='search' onChange={_handleChangeText}
              placeholder='Search...'/>
            <Button className='' content='Download' disabled/>
            <Button
              content='Filter' disabled icon='filter'
              labelPosition='left'/>
            <Button
              as={Link} color='teal' content='New Service'
              to='/service/create'/>
          </Grid.Column>
        </Grid>
        <Table
          duck={serviceDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
      </Segment>

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
      setItem    : serviceDetailDuck.creators.setItem,
      setFilters : serviceDuck.creators.setFilters
    })
)(ServiceList)
