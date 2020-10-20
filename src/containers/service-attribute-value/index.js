import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import ServiceAttributeValueCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import serviceAttributeValueDuck from '@reducers/service/service-attribute-value'
import serviceAttributeValueDetailDuck from '@reducers/service/service-attribute-value/detail'

const ServiceAttributeList = ({ serviceAttributeValue, serviceAttributeValueDetail, ...props }) => {
  const { id: serviceAttributeId } = useParams()
  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  useChangeStatusEffect(() => props.getSerivceAttributesValue(serviceAttributeId), serviceAttributeValueDetail.status, [ 'POSTED', 'PUT' ])

  useEffect(() => {
    if(serviceAttributeValueDetail.status === 'DELETED') props.getSerivceAttributesValue(serviceAttributeId)
  }, [ serviceAttributeValueDetail.status ])

  useEffect(() => {
    props.getSerivceAttributesValue(serviceAttributeId)
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(serviceAttributeValue.selector.selected_items[0], 'DELETE')
      _handleOpenDeleteModal()
    }
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
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Header as='h2'>Service Attributes / Dimension</Header>
          </Grid.Column>
          <Grid.Column
            computer={8}
            mobile={16} tablet={8} textAlign='right'>
            <Button
              as={Link} color='teal'
              content='New Value'
              onClick={_handleCreateClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={serviceAttributeValueDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>

      </Segment>
      <ServiceAttributeValueCreate/>
      <ModalDelete
        duckDetail={serviceAttributeValueDetailDuck}
        onClose={_handleCloseDeleteModal}
        open={openDeleteModal}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => {
      return {
        serviceAttributeValue      : serviceAttributeValueDuck.selectors.list(state),
        serviceAttributeValueDetail: serviceAttributeValueDetailDuck.selectors.detail(state)
      }
    },
    {
      getSerivceAttributesValue: serviceAttributeValueDuck.creators.get,
      setItem                  : serviceAttributeValueDetailDuck.creators.setItem
    }
  )
)(ServiceAttributeList)