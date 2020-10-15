import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import ServiceAttributeCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import serviceAttributeDuck from '@reducers/service/service-attribute'
import serviceAttributeDetailDuck from '@reducers/service/service-attribute/detail'

const ServiceAttributeList = ({ serviceAttribute, serviceAttributeDetail, ...props }) => {
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  const history = useHistory()

  useChangeStatusEffect(props.getServiceAttributes, serviceAttributeDetail.status)

  useEffect(() => {
    if(serviceAttributeDetail.status === 'DELETED') props.getServiceAttributes()
  }, [ serviceAttributeDetail.status ])

  useEffect(() => {
    props.getServiceAttributes()
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(serviceAttribute.selector.selected_items[0], 'DELETE')
      _handleOpenDeleteModal()
    }
  }

  const _handleRowOptionClick = (option, item) => {
    props.setItem(item)
    history.push(`/service-attribute-value/${item.id}`)
  }

  const _handleCreateClick = ()=> {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column width={4}>
            <Header as='h2'>Service Attributes</Header>
          </Grid.Column>
          <Grid.Column textAlign='right' width={12}>
            <Button
              as={Link} color='teal'
              content='New Attribute'
              onClick={_handleCreateClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={serviceAttributeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>

      </Segment>
      <ServiceAttributeCreate/>
      <ModalDelete
        duckDetail={serviceAttributeDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      serviceAttribute      : serviceAttributeDuck.selectors.list(state),
      serviceAttributeDetail: serviceAttributeDetailDuck.selectors.detail(state)

    }),
    {
      getServiceAttributes: serviceAttributeDuck.creators.get,
      setItem             : serviceAttributeDetailDuck.creators.setItem
    }
  )
)(ServiceAttributeList)
