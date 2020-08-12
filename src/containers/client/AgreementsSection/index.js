import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Header , Divider } from 'semantic-ui-react'

import Table from '@components/Table'
import useModal from '@components/Modal/useModal'

import SignAgreementForm from './SignAgreementForm'
import SendDocumentEmail from '../DocumentsSection/SendDocumentForm'
import ShowAgreement from './ShowAgreement'

import clientAgreementDuck from '@reducers/client/agreement'
import clientAgreementDetailDuck from '@reducers/client/agreement/detail'

import './styles.scss'

function AgreementsSection({ clientAgreementDetail, ...props }) {
  const [ openEmailFormModal, { _handleOpen: _handleOpenEmailFormModal, _handleClose: _handleCloseEmailFormModal } ] = useModal()
  const { client: clientId } = useParams()
  useEffect(()=> {
    props.getClientAgreements({
      client_id: clientId
    })
  }, [])

  useEffect(() => {
    const { status } = clientAgreementDetail

    if(status  === 'POSTED' || status === 'PUT')
      props.getClientAgreements()
  }, [ clientAgreementDetail.status ])

  const _handleRowOptionClick = (option, item) => {
    if(item.signed)
      switch (option) {
        case 'view_pdf':
        {
          props.setItem(item, 'ShowPdf')

          return
        }
        case 'print':
        {
          const file = new Blob([ item.document_filepath ], { type: 'application/pdf' })
          const fileURL = window.URL.createObjectURL(file)

          window.frames['print-pdf-frame'].src = fileURL

          window.frames['print-pdf-frame'].print()

          return
        }
        case 'download':
        {
          const downloadUrl = window.URL.createObjectURL(new Blob([ item.document_filepath ], { type: 'application/pdf' }))

          const link = document.createElement('a')

          link.href = downloadUrl

          link.setAttribute('download', `${item.name}.pdf`) // any other extension

          document.body.appendChild(link)

          link.click()

          link.remove()

          return
        }
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
        <iframe
          id='print-pdf-frame'
          name='print-pdf-frame'
          style={{ display: 'none' }}
          width='100%'/>
      </div>
      <Divider className='m0'/>
      <div className='mh40 mt20'>
        <Table
          duck={clientAgreementDuck}
          onRowOptionClick={_handleRowOptionClick}/>
        <SignAgreementForm/>
        <SendDocumentEmail onClose={_handleCloseEmailFormModal} open={openEmailFormModal}/>

        <ShowAgreement/>
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

