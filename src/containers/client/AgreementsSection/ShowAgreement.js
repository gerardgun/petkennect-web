import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Modal } from 'semantic-ui-react'

import clientAgreementDetailDuck from '@reducers/client/agreement/detail'

const ShowAgreement = props => {
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
              className='iframe-view-document'
              height='430px'
              position='absolute'
              src='http://africau.edu/images/default/sample.pdf'
              width='100%'/>
          </Grid.Column>
          <Grid.Column className='text-align-right' width='sixteen'>
            <Button
              className='w120'
              color='teal'
              content='Done'
              onClick={_handleClose}
              size='small'/>
          </Grid.Column>
        </Grid>
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
)(ShowAgreement)
