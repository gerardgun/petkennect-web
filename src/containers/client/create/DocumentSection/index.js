import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import Form from './Form'

import clientDocumentDuck from '@reducers/client/document'
import clientDocumentDetailDuck from '@reducers/client/document/detail'

const DocumentSection = ({ document, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

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
              <Header as='h2'>Document List</Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Button content='Filter' icon='filter' labelPosition='left'/>
              {
                document.selector.selected_items.length > 0 && (<Button color='google plus' content='Delete' onClick={_handleOpen}/>)
              }
              <Button color='teal' content='Add Document' onClick={_handleAddBtnClick}/>
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
      document: clientDocumentDuck.selectors.list(state)
    }),
    {
      setItem: clientDocumentDetailDuck.creators.setItem
    }
  )
)(DocumentSection)
