import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Header , Divider } from 'semantic-ui-react'
import { compose } from 'redux'
import useModal from '@components/Modal/useModal'
import './styles.scss'
import SignAgreementForm from './SignAgreementForm'
import SendAgreementEmail from './SendAgreementForm'
import ShowAgreementPdfEmail from './ShowAgreementPdfForm'

import Table from '@components/Table'

import clientAgreementDuck from '@reducers/client/agreement'

import clientAgreementDetailDuck from '@reducers/client/agreement/detail'

function AgreementsSection({ clientAgreementDetail, ...props }) {
  const [ openEmailFormModal, { _handleOpen: _handleOpenEmailFormModal, _handleClose: _handleCloseEmailFormModal } ] = useModal()
  const [ openShowPdfFormModal, { _handleOpen: _handleOpenPdfFormModal, _handleClose: _handleClosePdfFormModal } ] = useModal()

  useEffect(()=> {
    props.getClientAgreements()
  }, [])

  useEffect(() => {
    const { status } =  clientAgreementDetail

    if(status  === 'POSTED' || status === 'PUT')
      props.getClientAgreements()
  }, [ clientAgreementDetail.status ])

  const _handleRowOptionClick = (option, item) => {
    if(!item.is_pending)
      switch (option) {
        case 'view_pdf':
          props.setItem(item, 'ShowPdf')
          _handleOpenPdfFormModal()

          return

        case 'print':
          props.setItem(item, 'ShowPdf')
          _handleOpenPdfFormModal()

          return

        case 'download':
          window.open(item.document_filepath)

          return

        case 'send_document':
          props.setItem(item)
          _handleOpenEmailFormModal()

          return
        default:
          return
      }
    else
      switch (option) {
        case 'sign':
          props.setItem(item, 'Show')

          return
        default:
          return
      }
  }

  return (
    <div className='c-booking'>
      <div className='flex align-center justify-between ph40 pt40 pb16'>
        <Header className='c-title mv0'>
          Agreements
        </Header>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mt20'>
        <Table
          duck={clientAgreementDuck}
          onRowOptionClick={_handleRowOptionClick}/>

        <SignAgreementForm/>
        <SendAgreementEmail onClose={_handleCloseEmailFormModal} open={openEmailFormModal}/>
        <ShowAgreementPdfEmail onClose={_handleClosePdfFormModal} open={openShowPdfFormModal}/>
      </div>
    </div>
  )
}

AgreementsSection.propTypes = {  }

AgreementsSection.defaultProps = {  }

export default compose(
  connect(
    (state) => ({
      clientAgreementDetail: clientAgreementDetailDuck.selectors.detail(state)
    }), {
      setItem            : clientAgreementDetailDuck.creators.setItem,
      getClientAgreements: clientAgreementDuck.creators.get
    })
)(AgreementsSection)

