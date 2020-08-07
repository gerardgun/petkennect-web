import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Button,Form,Grid, Header, Modal } from 'semantic-ui-react'

import clientAgreementDetailDuck from '@reducers/client/agreement/detail'

const ShowAgreementPdfForm = props => {
  const {
    clientAgreementDetail
  } = props

  const getIsOpened = mode => (mode === 'ShowPdf')

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(clientAgreementDetail.mode), [ clientAgreementDetail.mode ])

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}
      size='small'>
      <Modal.Content>
        <Header as='h2' className='segment-content-header'>View Agreement</Header>
        <Grid>
          <Grid.Column className='grid-show-pdf' width='sixteen'>
            <iframe
              className='iframeViewDocument'
              height='430px'
              id='iframeViewDocument'
              position='absolute'
              src={clientAgreementDetail.item.document_filepath}
              width='100%'/>
          </Grid.Column>
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
      const clientAgreementDetail = clientAgreementDetailDuck.selectors.detail(state)
      const initialValues = { ...clientAgreementDetail.item }

      return {
        clientAgreementDetail,
        initialValues
      }
    },
    {
      resetItem: clientAgreementDetailDuck.creators.resetItem
    }
  )
)(ShowAgreementPdfForm)
