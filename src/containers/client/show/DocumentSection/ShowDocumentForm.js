import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Button,Form,Grid, Header, Modal } from 'semantic-ui-react'
import InputReadOnly from '@components/Common/InputReadOnly'

import clientDocumentDetailDuck from '@reducers/client/document/detail'

const ShowDocumentForm = props => {
  const {
    clientDocumentDetail
  } = props

  const getIsOpened = mode => (mode === 'Show')

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(clientDocumentDetail.mode), [ clientDocumentDetail.mode ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>View Document</Header>
        <Grid columns={2}>
          <InputReadOnly
            label='Document Name'
            value={clientDocumentDetail.item.filename || '-'}/>
          <InputReadOnly
            label='Type'
            value={clientDocumentDetail.item.type_name || '-'}/>
        </Grid>
        <Grid columns={1}>
          <InputReadOnly
            label='Comment'
            value={clientDocumentDetail.item.description || '-'}/>
        </Grid>
        <Form.Group className='form-modal-actions' widths='equal'>
          <Form.Field>
            <Button
              basic
              className='w120'
              color='teal'
              content='Cancel'
              onClick={_handleClose}
              size='small'/>
            <Button
              className='w120'
              color='teal'
              content='Done'
              onClick={_handleClose}/>
          </Form.Field>
        </Form.Group>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const clientDocumentDetail = clientDocumentDetailDuck.selectors.detail(state)
      const initialValues = { ...clientDocumentDetail.item }

      return {
        clientDocumentDetail,
        initialValues
      }
    },
    {
      resetItem: clientDocumentDetailDuck.creators.resetItem
    }
  )
)(ShowDocumentForm)
