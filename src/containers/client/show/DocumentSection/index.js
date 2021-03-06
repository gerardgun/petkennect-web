import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header, Grid, Container, Button } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import ClientDocumentFormSendModal from '@containers/client/show/DocumentSection/form/send/modal'
import ClientDocumentFormModal from './form/modal'
import ClientDocumentShowModal from './show/modal'
import clientDocumentListConfig from '@lib/constants/list-configs/client/document'

import clientDocumentDuck from '@reducers/client/document'
import clientDocumentDetailDuck from '@reducers/client/document/detail'

function DocumentsSection({ clientDocument, clientDocumentDetail, ...props }) {
  useEffect(() => {
    const { status } = clientDocumentDetail

    if(status === 'DELETED' || status === 'POSTED' || status === 'PUT')
      props.getClientDocuments()
  }, [ clientDocumentDetail.status ])

  const _handleOptionClick = option => {
    switch (option) {
      case 'view_pdf':
        window.open(clientDocument.selector.selected_items[0].filepath)

        return
      case 'edit':
        props.setItem(clientDocument.selector.selected_items[0], 'UPDATE')

        return
      case 'delete':
        props.setItem(null, 'DELETE')

        return
      case 'send_document':
        props.setItem(clientDocument.selector.selected_items[0], 'SEND')

        return
      default:
        return
    }
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'READ')
  }

  const _handleAddBtnClick = ()=> {
    props.setItem(null, 'CREATE')
  }

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header' columns={2}>
        <Grid.Column
          computer={8} mobile={14} tablet={8}
          verticalAlign='middle'>
          <Header as='h2'>Documents</Header>
        </Grid.Column>
        <Grid.Column
          className='ui-grid-align'
          computer={8} mobile={12} tablet={8}>
          <Button color='teal' content='New Document' onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <div className='mh12 mv20'>
        <Table
          config={clientDocumentListConfig}
          duck={clientDocumentDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </div>

      <ClientDocumentFormSendModal/>
      <ClientDocumentFormModal/>
      <ClientDocumentShowModal/>
      <ModalDelete duck={clientDocumentDuck} duckDetail={clientDocumentDetailDuck}/>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      clientDocument      : clientDocumentDuck.selectors.list(state),
      clientDocumentDetail: clientDocumentDetailDuck.selectors.detail(state)
    }),{
      setItem           : clientDocumentDetailDuck.creators.setItem,
      getClientDocuments: clientDocumentDuck.creators.get
    }
  )
)(DocumentsSection)
