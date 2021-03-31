import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Modal } from 'semantic-ui-react'

import customReportDetailDuck from '@reducers/custom-report/detail'

const ShowReport = ({ showReportDetail, ...props }) => {
  const { mode } = showReportDetail

  const _handleClose = () => {
    props.resetItem()
  }

  const isOpened = useMemo(() => mode === 'READ', [ mode ])

  return (
    <Modal
      basic
      className='show-agreement-modal modal-position'
      closeIcon
      onClose={_handleClose}
      open={isOpened}
      size='large'>
      <Modal.Content style={{ padding: 0 }}>
        <iframe src='https://nlnreportingtest.azurewebsites.net/DailyServiceReport/DailyServiceReport?In=xajdSRM0B/FbBAGbS9a+LiC8IA0p5b40vqoch/GWKNM=&Out=X2Rn8vICkVpUZEDg5osaeRLbMrnIac20Tbs50lN6WeQ=&storecd=CgY4wmzryhvmvL3L8zMVcA==&ExportType=Pdf'/>
      </Modal.Content>
    </Modal>
  )
}

export default compose(
  connect(
    state => ({
      showReportDetail: customReportDetailDuck.selectors.detail(state)
    }),
    {
      resetItem: customReportDetailDuck.creators.resetItem
    }
  )
)(ShowReport)
