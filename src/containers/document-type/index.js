import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import clientDocumentTypeListConfig from '@lib/constants/list-configs/client/document/type'
import DocumentTypeCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import clientDocumentTypeDuck from '@reducers/client/document/type'
import clientDocumentTypeDetailDuck from '@reducers/client/document/type/detail'

const DocumentType = ({ clientDocumentType, clientDocumentTypeDetail, ...props }) => {
  useChangeStatusEffect(props.getDocumentTypes, clientDocumentTypeDetail.status)

  useEffect(() => {
    props.getDocumentTypes()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') props.setItem(clientDocumentType.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Header as='h2'>Document Types</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={14} tablet={8}>
            <Button color='teal' content='New Document Type' onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>

        <Table
          config={clientDocumentTypeListConfig}
          duck={clientDocumentTypeDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>

      </Segment>

      <DocumentTypeCreate/>
      <ModalDelete duckDetail={clientDocumentTypeDetailDuck}/>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      clientDocumentType      : clientDocumentTypeDuck.selectors.list(state),
      clientDocumentTypeDetail: clientDocumentTypeDetailDuck.selectors.detail(state)

    }),
    {
      getDocumentTypes: clientDocumentTypeDuck.creators.get,
      setItem         : clientDocumentTypeDetailDuck.creators.setItem
    }
  )
)(DocumentType)
