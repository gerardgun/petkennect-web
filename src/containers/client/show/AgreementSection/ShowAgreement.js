import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Modal } from 'semantic-ui-react'

import clientAgreementDetailDuck from '@reducers/client/agreement/detail'

const ShowAgreement = ({ clientAgreementDetail, ...props }) => {
  const { item: agreement, mode } = clientAgreementDetail

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => mode === 'READ', [ mode ])

  return (
    <Modal
      basic
      className='show-agreement-modal'
      closeIcon
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content style={{ padding: 0 }}>
        <iframe src={agreement.document_filepath}/>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      clientAgreementDetail: clientAgreementDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: clientAgreementDetailDuck.creators.resetItem
    }
  )
)(ShowAgreement)
