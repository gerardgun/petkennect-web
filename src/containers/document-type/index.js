import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import DocumentTypeCreate from './create'

import clientDocumentTypeDuck from '@reducers/client/document/type'
import clientDocumentTypeDetailDuck from '@reducers/client/document/type/detail'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from 'src/hooks/Shared'

const DocumentType = props => {
  const { clientDocumentTypeDetail : { status } = {} } = props
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useEffect(() => {
    props.getDocumentTypes()
  }, [])

  useChangeStatusEffect(props.getDocumentTypes, status)

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

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

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Document Types</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              content='Download' disabled icon='cloud download'
              labelPosition='left'/>

            <Button
              as={Link} color='teal' content='New Document Type'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={clientDocumentTypeDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
        <DocumentTypeCreate/>
        <ModalDelete
          duckDetail={clientDocumentTypeDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Segment>

    </Layout>
  )
}

export default compose(
  connect(
    (state) => ({
      // clientDocumentTypes     : clientDocumentTypeDuck.selectors.list(state),
      clientDocumentTypeDetail: clientDocumentTypeDetailDuck.selectors.detail(state)

    }),
    {
      getDocumentTypes: clientDocumentTypeDuck.creators.get,
      setItem         : clientDocumentTypeDetailDuck.creators.setItem
    }
  )
)(DocumentType)
