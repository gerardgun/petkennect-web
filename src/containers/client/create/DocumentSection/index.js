import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import Form from './Form'

import clientDocumentDuck from '@reducers/client/document'
import clientDocumentDetailDuck from '@reducers/client/document/detail'
import { useParams } from 'react-router-dom'

const DocumentSection = ({ document, documentDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  const { client: client_id } = useParams()
  useEffect(() => {
    const { status } =  documentDetail

    if(status === 'DELETED' || status  === 'POSTED' || status === 'PUT')
      props.getDocuments({
        client_id
      })
  }, [ documentDetail.status ])
  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option/* , item */) => {
    if(option === 'preview') alert('Preview Document File...')
    else if(option === 'email') alert('Share Document via email...')
  }

  return (
    <Grid className='form-primary'>
      <Grid.Column>
        <Segment className='segment-content' padded='very'>
          <Grid className='segment-content-header' columns={2}>
            <Grid.Column>
              <Header as='h2' className='cls-MainHeader'>Document List</Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button
                className='cls-cancelButton' content='Filter' icon='filter'
                labelPosition='left'/>
              {
                document.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' onClick={_handleOpen}/>)
              }
              <Button
                className='cls-saveButton' color='teal' content='Add Document'
                onClick={_handleAddBtnClick}/>
            </Grid.Column>
          </Grid>
          <Table
            duck={clientDocumentDuck}
            onRowClick={_handleRowClick}
            onRowOptionClick={_handleRowOptionClick}/>
        </Segment>

        <Form/>
        <ModalDelete
          duck={clientDocumentDuck}
          duckDetail={clientDocumentDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  connect(
    state => ({
      document      : clientDocumentDuck.selectors.list(state),
      documentDetail: clientDocumentDetailDuck.selectors.detail(state)
    }),
    {
      setItem     : clientDocumentDetailDuck.creators.setItem,
      getDocuments: clientDocumentDuck.creators.get
    }
  )
)(DocumentSection)
